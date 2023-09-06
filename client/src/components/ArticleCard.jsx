import React from 'react';
import { BsPatchCheckFill } from 'react-icons/bs';
import { images, stables } from '../constants';
import { Link } from 'react-router-dom';

const ArticleCard = ({ post }) => {
  return (
    <Link
      to="/"
      className="relative transition-all rounded bg-bgColor-light hover:scale-110 hover:bg-bgColor-dark group"
    >
      <div className="rounded-t">
        <img
          src={
            post.photo
              ? stables.UPLOAD_FOLDER_BASE_URL + post.photo
              : images.sampleImage
          }
          alt="title"
          className="object-cover w-full h-[300px] md:h-[220px] transition-all rounded-t group-hover:opacity-0"
        />
      </div>

      <div className="flex flex-col justify-center gap-3 p-3 transition-all group-hover:opacity-0">
        <div>
          <h2 className="font-semibold title-xl">{post.title}</h2>
          {/* <p className="text-sm additional-text">{post.caption}</p> */}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <img
              src={
                // post.user.avatar ? images.sampleProfile : images.sampleProfile
                post.user.avatar
                  ? stables.UPLOAD_FOLDER_BASE_URL + post.user.avatar
                  : images.sampleImage
              }
              alt="post profile"
              className="rounded-full w-9 h-9"
            />
            <div className="flex flex-col text-textColor-light">
              <div className="flex items-center gap-1 text-sm">
                <h4 className="font-semibold">{post.user.name}</h4>
                {post.user.verified ? (
                  <span>
                    <BsPatchCheckFill />
                  </span>
                ) : null}
              </div>
              <span className="text-xs additional-text">
                {post.user.verified ? 'Verified' : 'Unverified'} writer
              </span>
            </div>
          </div>
          <div className="flex items-center gap-1 italic font-semibold opacity-70 text-textColor-light">
            <span className="text-xs">
              {new Date(post.createdAt).getDate()}{' '}
            </span>
            <span className="text-sm">
              {new Date(post.createdAt).toLocaleString('en-US', {
                month: 'short',
              })}
            </span>
          </div>
        </div>
      </div>

      <p className="text-sm font-semibold transition-all opacity-0 text-textColor-dark group-hover:opacity-100 position-center">
        {post.title}
      </p>
    </Link>
  );
};

export default ArticleCard;
