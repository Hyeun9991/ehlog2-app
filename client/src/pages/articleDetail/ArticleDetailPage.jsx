import { useQuery } from '@tanstack/react-query';
import Bold from '@tiptap/extension-bold';
import Document from '@tiptap/extension-document';
import Italic from '@tiptap/extension-italic';
import Paragraph from '@tiptap/extension-paragraph';
import Text from '@tiptap/extension-text';
import { generateHTML } from '@tiptap/html';
import parse from 'html-react-parser';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import BreadCrumbs from '../../components/BreadCrumbs.jsx';
import ErrorMessage from '../../components/ErrorMessage.jsx';
import SocialShareButtons from '../../components/SocialShareButton.jsx';
import CommentsContainer from '../../components/comments/CommentsContainer.jsx';
import Layout from '../../components/layout/Layout.jsx';
import images from '../../constants/images.js';
import stables from '../../constants/stables.js';
import { getAllPosts, getSinglePosts } from '../../services/index/posts.js';
import ArticleDetailSkeleton from './components/ArticleDetailSkeleton.jsx';
import SuggestedPosts from './container/SuggestedPosts.jsx';

const ArticleDetailPage = () => {
  const { slug } = useParams();
  const userState = useSelector((state) => state.user);

  const [breadCrumbsData, setBreadCrumbsData] = useState([]);
  const [body, setBody] = useState(null);

  const { data, isLoading, isError } = useQuery({
    queryFn: () => getSinglePosts({ slug }),
    queryKey: ['blog', slug], // 쿼리의 고유 키, 또한 캐시에서 데이터를 식별하는 데 사용
    onSuccess: (data) => {
      setBreadCrumbsData([
        { id: 1, name: 'Home', to: '/' },
        { id: 2, name: 'Blog', to: '/blog' },
        { id: 3, name: `${data.title}`, to: `/blog/${slug}` },
      ]);

      // 데이터를 HTML로 파싱하고 파싱된 내용을 설정
      setBody(
        parse(
          generateHTML(data?.body, [Document, Paragraph, Text, Bold, Italic]),
        ),
      );
    },
  });

  const { data: postsData } = useQuery({
    queryFn: () => getAllPosts(),
    queryKey: ['posts'],
  });

  return (
    <Layout className="px-3 bg-bgColor-light dark:bg-bgColor-dark">
      {isLoading ? (
        <ArticleDetailSkeleton />
      ) : isError ? (
        <ErrorMessage message="게시물 세부정보를 가져올 수 없습니다." />
      ) : (
        <section className="container flex flex-col max-w-5xl mx-auto mt-5 lg:flex-row lg:gap-x-6 lg:items-start">
          <article className="flex flex-col gap-3 main-container">
            <BreadCrumbs data={breadCrumbsData} />
            <div className="w-full h-[250px] sm:h-[350px] md:h-[400px]">
              <img
                src={
                  data?.photo
                    ? stables.UPLOAD_FOLDER_BASE_URL + data?.photo
                    : images.bear3
                }
                alt={data?.title}
                className="object-cover w-full h-full rounded"
              />
            </div>
            <div className="flex gap-2">
              {data?.categories.map((category) => (
                <Link
                  to={`/blog?category=${category.name}`}
                  className="p-1 text-xs font-semibold rounded-sm bg-bgColor-dark text-textColor-dark"
                >
                  {category.name}
                </Link>
              ))}
            </div>
            <h1 className="mt-3 leading-3 title-2xl">{data?.title}</h1>
            <div className="mt-3 text-sm prose-sm prose sm:prose-base text-textColor-light/90">
              {body}
            </div>
            <CommentsContainer
              className="mt-10 "
              comments={data?.comments}
              logginedUserId={userState?.userInfo?._id}
              postSlug={slug}
            />
          </article>

          <div className="flex flex-col flex-1 gap-6 main-container">
            {/* 추천 게시물 & 추천 태그*/}
            <div>
              <SuggestedPosts
                header="추천 포스터"
                posts={postsData?.data}
                tags={data?.tags}
                className="mt-10 lg:mt-0 lg:max-w-xs"
              />
            </div>

            {/* 공유 */}
            <div>
              <h2 className="flex-1 mb-4 text-xs additional-text">공유하기</h2>
              <SocialShareButtons
                url={encodeURI(window.location.href)}
                title={encodeURIComponent(data?.title)}
              />
            </div>
          </div>
        </section>
      )}
    </Layout>
  );
};

export default ArticleDetailPage;
