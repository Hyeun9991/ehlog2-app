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

const ArticleDetailPage = () => {
  const { slug } = useParams();

  const [breadCrumbsData, setBreadCrumbsData] = useState([]);
  const [body, setBody] = useState(null);

  const { data } = useQuery({
    queryFn: () => getSinglePosts({ slug }),
    queryKey: ['blog', slug],
    onSuccess: (data) => {
      setBreadCrumbsData([
        { id: 1, name: 'Home', to: '/' },
        { id: 2, name: 'Blog', to: '/blog' },
        { id: 3, name: `${data.title}`, to: `/blog/${slug}` },
      ]);
      setBody(
        parse(
          generateHTML(data?.body, [Document, Paragraph, Text, Bold, Italic]),
        ),
      );
    },
  });

  return (
    <Layout>
      <section className="min-h-screen py-10 main-container">
        <article className="flex flex-col items-start flex-1 gap-3">
          <BreadCrumbs data={breadCrumbsData} />
          <div className="w-full h-[50vh]">
            <img
              src={
                data?.photo
                  ? stables.UPLOAD_FOLDER_BASE_URL + data?.photo
                  : images.bear3
              }
              alt={data?.title}
              className="object-cover w-full h-full"
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
          <h1 className="text-2xl leading-3">{data?.title}</h1>
          <div className="prose-sm prose sm:prose-base">{body}</div>
        </article>
      </section>
    </Layout>
  );
};

export default ArticleDetailPage;
