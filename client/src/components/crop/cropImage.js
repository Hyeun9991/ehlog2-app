// 이미지를 로드하는 함수
export const createImage = (url) =>
  new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener('load', () => resolve(image)); // 이미지 로드 성공 시 resolve 호출
    image.addEventListener('error', (error) => reject(error)); // 이미지 로드 실패 시 reject 호출
    image.setAttribute('crossOrigin', 'anonymous'); // CodeSandbox에서의 크로스-오리진 이슈를 피하기 위해 필요
    image.src = url;
  });

// 각도를 라디안으로 변환하는 함수
export function getRadianAngle(degreeValue) {
  return (degreeValue * Math.PI) / 180;
}

/**
 * 회전된 사각형의 새로운 바운딩 영역을 반환합니다.
 */
export function rotateSize(width, height, rotation) {
  const rotRad = getRadianAngle(rotation);

  return {
    width:
      Math.abs(Math.cos(rotRad) * width) + Math.abs(Math.sin(rotRad) * height), // 가로 길이 계산
    height:
      Math.abs(Math.sin(rotRad) * width) + Math.abs(Math.cos(rotRad) * height), // 세로 길이 계산
  };
}

/**
 * 이 함수는 https://github.com/DominicTobias/react-image-crop의 README에서 가져온 것입니다.
 * 이미지를 회전 및 뒤집은 후 자른 이미지를 반환합니다.
 */
export default async function getCroppedImg(
  imageSrc, // 원본 이미지 URL
  pixelCrop, // 자를 영역 좌표 및 크기 정보
  rotation = 0, // 이미지 회전 각도 (기본값: 0도)
  flip = { horizontal: false, vertical: false }, // 이미지 뒤집기 여부 (기본값: 뒤집지 않음)
) {
  const image = await createImage(imageSrc); // 이미지를 로드합니다.
  const canvas = document.createElement('canvas'); // 새로운 캔버스 요소 생성
  const ctx = canvas.getContext('2d'); // 캔버스 컨텍스트 얻기

  if (!ctx) {
    return null;
  }

  const rotRad = getRadianAngle(rotation); // 라디안으로 회전 각도 계산

  // 회전된 이미지의 바운딩 박스 계산
  const { width: bBoxWidth, height: bBoxHeight } = rotateSize(
    image.width,
    image.height,
    rotation,
  );

  // 캔버스 크기를 바운딩 박스와 일치하도록 설정
  canvas.width = bBoxWidth;
  canvas.height = bBoxHeight;

  // 캔버스 컨텍스트를 중앙으로 이동하여 중심을 중심으로 회전 및 뒤집기 가능하도록 함
  ctx.translate(bBoxWidth / 2, bBoxHeight / 2);
  ctx.rotate(rotRad);
  ctx.scale(flip.horizontal ? -1 : 1, flip.vertical ? -1 : 1);
  ctx.translate(-image.width / 2, -image.height / 2);

  // 회전된 이미지 그리기
  ctx.drawImage(image, 0, 0);

  const croppedCanvas = document.createElement('canvas'); // 새로운 캔버스 요소 생성

  const croppedCtx = croppedCanvas.getContext('2d'); // 캔버스 컨텍스트 얻기

  if (!croppedCtx) {
    return null;
  }

  // 잘린 캔버스의 크기 설정
  croppedCanvas.width = pixelCrop.width;
  croppedCanvas.height = pixelCrop.height;

  // 원본 캔버스에서 자른 영역을 새로운 캔버스에 그립니다.
  croppedCtx.drawImage(
    canvas,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    pixelCrop.width,
    pixelCrop.height,
  );

  // Base64 문자열 또는 Blob 형식으로 이미지 반환
  // Base64 문자열로 반환: return croppedCanvas.toDataURL('image/jpeg');
  // Blob 형식으로 반환:
  return new Promise((resolve, reject) => {
    croppedCanvas.toBlob((file) => {
      resolve({ url: URL.createObjectURL(file), file: file });
    });
  });
}
