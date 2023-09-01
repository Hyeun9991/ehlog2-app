import React, { useState } from 'react';
import Cropper from 'react-easy-crop';
import getCroppedImg from './cropImage';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateProfilePicture } from '../../services/index/users';
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../../store/reducers/userReducers';
import { toast } from 'react-hot-toast';

const CropEasy = ({ photo, setOpenCrop }) => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.user);

  const [crop, setCrop] = useState({ x: 0, y: 0 }); // 이미지 크롭 상태 관리
  const [zoom, setZoom] = useState(1); // 이미지 줌 상태 관리 (기본값은 100%)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null); // 크롭된 영역 픽셀 정보 관리

  const { mutate, isLoading } = useMutation({
    // 사용자가 제출한 정보를 바탕으로 updateProfilePicture 함수 호출
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
      toast.success('프로필 사진이 성공적으로 업데이트되었습니다.');
    },
    onError: (error) => {
      toast.error(error.message);
      console.log(error);
    },
  });

  // 크롭 완료 이벤트 핸들러
  const handleCropComplete = (croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  // 이미지 크롭 및 업로드 이벤트 핸들러
  const handleCropImage = async () => {
    try {
      const croppedImg = await getCroppedImg(photo?.url, croppedAreaPixels);

      // 크롭된 이미지를 File 객체로 변환하여 formData에 추가
      const file = new File([croppedImg.file], `${photo?.file?.name}`, {
        type: photo?.file?.type,
      });

      const formData = new FormData();
      formData.append('profilePicture', file); // form-data에 크롭된 이미지 추가

      mutate({ token: userState.userInfo.token, formData: formData });
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };

  return (
    <div className="fixed z-[1000] inset-0 bg-black/40 flex justify-center items-center p-5 overflow-auto">
      <div className="bg-bgColor-dark h-fit w-full sm:max-w-[350px] p-7 rounded flex flex-col items-center gap-3">
        {/* <h2 className="text-lg font-semibold text-textColor-dark">
          이미지 자르기
        </h2> */}
        <div className="relative w-full overflow-hidden bg-bgColor-light/10 aspect-square">
          <Cropper
            image={photo?.url}
            crop={crop}
            zoom={zoom}
            aspect={1}
            onZoomChange={setZoom}
            onCropChange={setCrop}
            onCropComplete={handleCropComplete}
          />
        </div>
        <div className="w-full mb-4">
          <label
            htmlFor="zoomRage"
            className="block text-xs font-semibold uppercase text-textColor-dark/70"
          >
            {/* {`${Math.round(zoom * 100)}%`} */}
          </label>
          <input
            type="range"
            id="zoomRage"
            min={1}
            max={3}
            step={0.1}
            value={zoom}
            onChange={(e) => setZoom(e.target.value)}
            className="w-full h-0.5 bg-blue-500 rounded-lg appearance-none cursor-pointer range-sm"
          />
        </div>
        <div className="flex flex-wrap justify-between w-full">
          <button
            disabled={isLoading}
            onClick={() => setOpenCrop(false)}
            className="bg-bgColor-light/10 main-button"
          >
            취소
          </button>
          <button
            disabled={isLoading}
            onClick={handleCropImage}
            className="bg-blue-500 main-button"
          >
            자르기 및 업로드
          </button>
        </div>
      </div>
    </div>
  );
};

export default CropEasy;
