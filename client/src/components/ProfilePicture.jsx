import React from 'react';
import { stables } from '../constants';
import { HiOutlineCamera } from 'react-icons/hi';

const ProfilePicture = ({ avatar }) => {
  return (
    <div className="flex flex-col items-center w-full gap-y-3">
      <div className="relative w-[100px] h-[100px] overflow-hidden rounded-full outline outline-1.5 outline-bgColor-dark">
        <label
          htmlFor="profilePicture"
          className="absolute inset-0 bg-transparent rounded-full cursor-pointer"
        >
          {avatar ? (
            <img
              src={stables.UPLOAD_FOLDER_BASE_URL + avatar}
              alt="profile"
              className="object-contain w-full h-full"
            />
          ) : (
            <div className="flex items-center justify-center w-full h-full bg-transparent">
              <HiOutlineCamera className="w-6 h-auto text-textColor-light" />
            </div>
          )}
        </label>
        <input type="file" className="sr-only" id="profilePicture" />
      </div>
      <button
        type="button"
        className="text-xs text-textColor-light hover:text-red-500 hover-text hover:underline"
      >
        삭제하기
      </button>
    </div>
  );
};

export default ProfilePicture;
