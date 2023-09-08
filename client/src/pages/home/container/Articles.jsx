import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getAllPosts } from '../../../services/index/posts';
import { toast } from 'react-hot-toast';
import ArticleCard from '../../../components/ArticleCard';
import ArticleCardSkeleton from '../../../components/ArticleCardSkeleton';
import ErrorMessage from '../../../components/ErrorMessage';

const Articles = () => {
  const { data, isLoading, isError } = useQuery({
    queryFn: () => getAllPosts(),
    queryKey: ['posts'],
    onError: (error) => {
      toast.error(error.message);
      console.log(error);
    },
  });

  return (
    <section className="px-3">
      <p className="flex-1 mb-6 text-xs additional-text">새로운 포스터</p>
      <div className="flex ">
        {isLoading ? (
          <ArticleCardSkeleton />
        ) : isError ? (
          <ErrorMessage message="게시물 데이터를 가져올 수 없습니다." />
        ) : (
          data.map((post) => <ArticleCard key={post._id} post={post} />)
        )}
      </div>
    </section>
  );
};

export default Articles;
