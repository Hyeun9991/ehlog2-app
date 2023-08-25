import fs from 'fs';
import path from 'path';

const fileRemover = (filename) => {
  // 주어진 파일명을 기반으로 파일 삭제 함수 정의
  fs.unlink(path.join(__dirname, '../uploads', filename), function (err) {
    if (err && err.code === 'ENOENT') {
      // 파일이 존재하지 않을 때
      console.log(`파일 ${filename}이(가) 존재하지 않아 삭제하지 않습니다.`);
    } else if (err) {
      // 파일 삭제 중 오류 발생 시
      console.log(err.message);
      console.log(`파일 ${filename} 삭제 중 오류가 발생했습니다.`);
    } else {
      // 파일 삭제 성공 시
      console.log(`${filename} 파일이 삭제되었습니다.`);
    }
  });
};

export { fileRemover };
