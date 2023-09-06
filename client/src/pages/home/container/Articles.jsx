import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getAllPosts } from '../../../services/index/posts';
import { toast } from 'react-hot-toast';
import ArticleCard from '../../../components/ArticleCard';

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
    <section>
      <div className="grid grid-cols-1 gap-4 p-3 md:grid-cols-2">
        {!isLoading &&
          !isError &&
          data.map((post) => <ArticleCard key={post._id} post={post} />)}
      </div>
    </section>
  );
};

export default Articles;
