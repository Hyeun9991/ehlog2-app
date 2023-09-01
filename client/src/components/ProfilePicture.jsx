import React, { useState } from 'react';
import { stables } from '../constants';
import { createPortal } from 'react-dom';
import { HiOutlineCamera } from 'react-icons/hi';
import CropEasy from './crop/CropEasy';

const ProfilePicture = ({ avatar }) => {
  const [openCrop, setOpenCrop] = useState(false);
  const [photo, setPhoto] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setPhoto({ url: URL.createObjectURL(file), file: file }); // 선택된 파일 정보를 photo 상태에 저장하고 크롭 모달 열기
    setOpenCrop(true);
  };

  return (
    <>
      {openCrop &&
        // 크롭 모달이 열려있으면 portal을 사용하여 모달을 렌더링
        createPortal(
          <CropEasy photo={photo} setOpenCrop={setOpenCrop} />,
          document.getElementById('portal'),
        )}
      <div className="flex flex-col items-center w-full gap-y-3">
        <div className="relative w-[100px] h-[100px] overflow-hidden rounded-full outline outline-1 hover:outline-2 transition-all outline-bgColor-dark">
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
          <input
            type="file"
            className="sr-only"
            id="profilePicture"
            onChange={handleFileChange}
          />
        </div>
        <button
          type="button"
          className="text-xs text-textColor-light hover:text-red-500 hover-text hover:underline"
        >
          삭제하기
        </button>
      </div>
    </>
  );
};

export default ProfilePicture;
