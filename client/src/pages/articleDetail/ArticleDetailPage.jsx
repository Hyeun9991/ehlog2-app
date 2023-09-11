import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getSinglePosts } from '../../services/index/posts.js';
import Layout from '../../components/layout/Layout.jsx';
import BreadCrumbs from '../../components/BreadCrumbs.jsx';
import images from '../../constants/images.js';
import stables from '../../constants/stables.js';
import { generateHTML } from '@tiptap/html';
import Bold from '@tiptap/extension-bold';
import Document from '@tiptap/extension-document';
import Paragraph from '@tiptap/extension-paragraph';
import Text from '@tiptap/extension-text';
import Italic from '@tiptap/extension-italic';
import parse from 'html-react-parser';
import ArticleDetailSkeleton from './components/ArticleDetailSkeleton.jsx';
import ErrorMessage from '../../components/ErrorMessage.jsx';
import CommentsContainer from '../../components/comments/CommentsContainer.jsx';
import { useSelector } from 'react-redux';

const ArticleDetailPage = () => {
  const { slug } = useParams();
  const userState = useSelector((state) => state.user);

  const [breadCrumbsData, setBreadCrumbsData] = useState([]);
  const [body, setBody] = useState(null);

  const { data, isLoading, isError } = useQuery({
    queryFn: () => getSinglePosts({ slug }),
    queryKey: ['blog', slug],
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

  return (
    <Layout>
      {isLoading ? (
        <ArticleDetailSkeleton />
      ) : isError ? (
        <ErrorMessage message="게시물 세부정보를 가져올 수 없습니다." />
      ) : (
        <section className="min-h-screen py-10 main-container">
          <article className="flex flex-col flex-1 gap-3">
            <BreadCrumbs data={breadCrumbsData} />
            <div className="w-full h-[50vh]">
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
          </article>
          <CommentsContainer
            className="mt-10"
            comments={data?.comments}
            logginedUserId={userState?.userInfo?._id}
            postSlug={slug}
          />
        </section>
      )}
    </Layout>
  );
};

export default ArticleDetailPage;
