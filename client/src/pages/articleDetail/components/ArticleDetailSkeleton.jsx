import React from 'react';
import { BsImages } from 'react-icons/bs';

const ArticleDetailSkeleton = () => {
  return (
    <div className="flex flex-col gap-3 py-10 main-container animate-pulse">
      {/* 브레드 크럼브스 */}
      <div className="w-48 h-4 rounded-sm bg-black/10" />

      {/* 이미지 */}
      <div className="w-full h-[50vh]">
        <div className="flex items-center justify-center object-cover w-full h-full rounded-sm aspect-video bg-black/10">
          <BsImages className="text-4xl text-black/30" />
        </div>
      </div>

      {/* 타이틀 */}
      <div className="w-64 h-5 mt-3 rounded-sm bg-black/10" />

      {/* 내용 */}
      <div className="w-full h-3 mt-3 rounded-sm bg-black/10" />
      <div className="h-3 rounded-sm w-80 bg-black/10" />
      <div className="h-3 rounded-sm w-96 bg-black/10" />
    </div>
  );
};

export default ArticleDetailSkeleton;
