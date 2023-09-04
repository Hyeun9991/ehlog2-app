import React, { useState } from 'react';
import { stables } from '../constants';
import { createPortal } from 'react-dom';
import { HiOutlineCamera } from 'react-icons/hi';
import CropEasy from './crop/CropEasy';
import { toast } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateProfilePicture } from '../services/index/users';
import { userActions } from '../store/reducers/userReducers';

const ProfilePicture = ({ avatar }) => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.user);

  const [openCrop, setOpenCrop] = useState(false);
  const [photo, setPhoto] = useState(null);

  /**
   * 데이터 업데이트 (Mutation)
   * useMutation을 사용하여 데이터를 업데이트하는 동작을 정의
   */
  const { mutate, isLoading } = useMutation({
    mutationFn: ({ token, formData }) => {
      return updateProfilePicture({
        token: token,
        formData: formData,
      });
    },
    onSuccess: (data) => {
      dispatch(userActions.setUserInfo(data)); // 사용자 정보 업데이트 액션 디스패치
      setOpenCrop(false);
      localStorage.setItem('account', JSON.stringify(data)); // 로컬 스토리지에 사용자 정보 저장
      queryClient.invalidateQueries(['profile']); // 'profile' 쿼리가 무효화, 이는 새로운 데이터를 가져오거나 업데이트된 데이터를 반영하기 위해 쿼리를 다시 실행하도록 지시
      toast.success('프로필 사진이 성공적으로 삭제되었습니다.');
    },
    onError: (error) => {
      toast.error(error.message);
      console.log(error);
    },
  });

  /**
   * 선택된 파일 정보를 photo 상태에 저장하고 크롭 모달 열기
   */
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setPhoto({ url: URL.createObjectURL(file), file: file });
    setOpenCrop(true);
  };

  /**
   * 토큰과 폼 데이터(undefined)를 mutate 함수를 호출하여 데이터를 업데이트
   * 프로필 사진 삭제 작업을 처리
   */
  const handleDeleteImage = () => {
    if (window.confirm('프로필 사진을 삭제하겠습니까?')) {
      try {
        const formData = new FormData();
        formData.append('profilePicture', undefined); // form-data에 undefined 추가

        mutate({ token: userState.userInfo.token, formData: formData });
      } catch (error) {
        toast.error(error.message);
        console.log(error);
      }
    }
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
          onClick={handleDeleteImage}
        >
          삭제하기
        </button>
      </div>
    </>
  );
};

export default ProfilePicture;
