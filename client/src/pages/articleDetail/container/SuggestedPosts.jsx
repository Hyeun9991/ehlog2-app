import React from 'react';
import { images, stables } from '../../../constants';
import { Link } from 'react-router-dom';

const SuggestedPosts = ({ className, header, posts = [], tags }) => {
  return (
    <div className={`${className} flex flex-col gap-6`}>
      <div>
        <h2 className="flex-1 mb-4 text-xs additional-text">{header}</h2>
        <div className="flex flex-col gap-2">
          {posts.map((item) => (
            <Link
              to={`/blog/${item.slug}`}
              key={item._id}
              className="flex items-center gap-3 group"
            >
              {/* 포스트 이미지 */}
              <div className="w-[45px] h-[45px]">
                <img
                  src={
                    item?.image
                      ? stables.UPLOAD_FOLDER_BASE_URL + item?.image
                      : images.bear3
                  }
                  alt={item.title}
                  className="object-cover w-full h-full rounded"
                />
              </div>

              <div className="flex flex-col">
                {/* 제목 */}
                <h3 className="text-base font-semibold group-hover:underline">
                  {item.title}
                </h3>

                {/* 날짜 */}
                <div className="flex items-center gap-1 mb-2 text-xs additional-text text-textColor-light">
                  <span>
                    {new Date(item.createdAt).toLocaleDateString('ko-KR', {
                      year: 'numeric',
                      month: '2-digit',
                      day: '2-digit',
                      weekday: 'short',
                    })}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="flex flex-col">
        <h2 className="flex-1 mb-4 text-xs additional-text">추천 태그</h2>
        {tags.length === 0 ? (
          <p className="text-xs additional-text opacity-30">
            이 포스트에는 태그가 없습니다
          </p>
        ) : (
          <div className="flex items-center gap-2">
            {tags.map((tag, index) => (
              <Link
                key={index}
                className="p-1 text-xs font-semibold transition-all rounded-sm hover:scale-110 bg-bgColor-dark text-textColor-dark"
              >
                {tag}
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SuggestedPosts;
