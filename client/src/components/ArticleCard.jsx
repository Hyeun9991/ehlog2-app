import React from 'react';
import { BsPatchCheckFill } from 'react-icons/bs';
import { images, stables } from '../constants';
import { Link } from 'react-router-dom';

const ArticleCard = ({ post }) => {
  return (
    <Link
      to={`/blog/${post.slug}`}
      className="flex flex-col w-full gap-3 group"
    >
      {/* 타이틀 & 캡션(설명글?) */}
      <div className="text-textColor-light">
        <h2 className="leading-3 title-xl group-hover:underline">
          {post.title}
        </h2>
        {/* <p className="text-sm additional-text">{post.caption}</p> */}
      </div>

      {/* 컨탠츠 내용 & 이미지 */}
      <div className="flex gap-6">
        <p className="flex-1 overflow-hidden text-sm whitespace-normal sm:leading-6 text-textColor-light/90 line-clamp-3 sm:line-clamp-5">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ullam Lorem
          ipsum dolor, sit amet consectetur adipisicing elit. Ullam Lorem ipsum
          dolor, sit amet consectetur adipisicing elit. Ullam Lorem ipsum dolor,
          sit amet consectetur adipisicing elit. Ullam
        </p>
        <div className="w-[100px] h-[100px] hidden sm:block">
          <img
            src={
              post?.photo
                ? stables.UPLOAD_FOLDER_BASE_URL + post?.photo
                : images.bear3
            }
            alt={post.title}
            className="object-cover w-full h-full rounded"
          />
        </div>
      </div>

      {/* 작성자 정보 & 날짜 */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img
            src={
              post.user.avatar
                ? stables.UPLOAD_FOLDER_BASE_URL + post.user.avatar
                : images.sampleImage
            }
            alt="post profile"
            className="w-8 h-8 rounded-full"
          />
          <div className="flex flex-col text-textColor-light">
            <div className="flex items-center gap-1 text-sm">
              <h4 className="font-semibold">{post.user.name}</h4>
              {post.user.verified ? (
                <span className="text-xs">
                  <BsPatchCheckFill />
                </span>
              ) : null}
            </div>
            <span className="text-xs additional-text">
              {post.user.verified ? 'Verified' : 'Unverified'} writer
            </span>
          </div>
        </div>
        <div className="flex items-center gap-1 text-xs additional-text text-textColor-light">
          <span>
            {new Date(post.createdAt).toLocaleDateString('ko-KR', {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
              weekday: 'short',
            })}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default ArticleCard;
