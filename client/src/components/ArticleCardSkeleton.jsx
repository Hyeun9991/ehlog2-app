import React from 'react';

const ArticleCardSkeleton = () => {
  return (
    <div className="flex flex-col w-full min-h-screen gap-3 mb-6 animate-pulse">
      {/* 제목 */}
      <div className="w-32 h-5 rounded-sm bg-black/10" />
      <div className="flex gap-6">
        {/* 내용 */}
        <div className="flex-1 w-full h-4 mt-1 rounded-sm bg-black/10" />
        {/* 이미지 */}
        <div className="sm:block hidden w-[100px] h-[100px] aspect-video bg-black/10" />
      </div>
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center gap-2">
          {/* 프로필 사진 */}
          <div className="w-8 h-8 rounded-full sm:w-9 sm:h-9 bg-black/10" />
          <div>
            {/* 사용자 정보 */}
            <div className="w-[110px] h-3 mt-1 rounded-sm bg-black/10" />
            {/* 검증 상태 */}
            <div className="w-[110px] h-2 mt-1 rounded-sm bg-black/10" />
          </div>
        </div>
        {/* 날짜 */}
        <div className="w-32 h-3 mt-1 rounded-sm bg-black/10" />
      </div>
    </div>
  );
};

export default ArticleCardSkeleton;
