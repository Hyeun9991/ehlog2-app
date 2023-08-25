import multer from 'multer';
import path from 'path';

// 파일 업로드를 위한 설정을 정의
const storage = multer.diskStorage({
  // 파일이 저장될 디렉토리 설정
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../uploads'));
  },
  // 파일명 설정
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// 파일 업로드를 위한 multer 미들웨어 설정
const uploadPicture = multer({
  storage: storage,
  limits: {
    fileSize: 1 * 1000000, // 1MB
  },
  fileFilter: function (req, file, cb) {
    // 업로드될 파일의 확장자 검사
    let ext = path.extname(file.originalname);

    if (ext !== '.png' && ext !== '.jpg' && ext !== '.jpeg') {
      // 허용되지 않은 확장자인 경우 오류 반환
      return cb(new Error('.png, .jpg, .jpeg 파일만 업로드 가능합니다.'));
    }

    cb(null, true); // 허용된 확장자면 업로드 허용
  },
});

export { uploadPicture };
