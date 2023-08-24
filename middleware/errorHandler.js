// 에러 발생 시 에러 객체를 받아와 해당 에러에 대한 응답을 생성
export const errorResponserHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 400; // 400: bad request

  // 응답 객체의 상태 코드를 설정하고, JSON 형태로 에러 메시지와 스택 정보를 전송
  res.status(statusCode).json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack, // 개발 환경에서는 에러 스택 정보를 전달, 프로덕션 환경에서는 전달하지 않음
  });
};

// 해당 경로에 대한 처리가 없을 때, 404 (Not Found) 에러를 발생시켜 에러 핸들러로 넘김
export const invalidPathHandler = (req, res, next) => {
  let error = new Error('유효하지 않은 경로입니다.');

  error.statusCode = 404; // 404: Not Found

  next(error);
};
