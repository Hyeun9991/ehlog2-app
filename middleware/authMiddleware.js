import { verify } from 'jsonwebtoken';
import User from '../models/User';

// 인증된 사용자인지 검사
// 요청 헤더의 Authorization 토큰을 확인하여 유효한 토큰인 경우 사용자 정보를 요청 객체에 추가
export const authGuard = async (req, res, next) => {
  // 요청 헤더에 Authorization 토큰이 있는지 확인하고, 'Bearer'로 시작하는지 검사
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // 토큰을 추출하여 검증하고, 해당 사용자의 ID를 추출합니다.
      const token = req.headers.authorization.split(' ')[1];
      const { id } = verify(token, process.env.JWT_SECRET);

      // 추출한 사용자 ID를 사용하여 데이터베이스에서 사용자 정보를 조회하고, 비밀번호를 제외한 정보를 요청 객체에 추가
      req.user = await User.findById(id).select('-password');

      next();
    } catch (error) {
      // 토큰 검증 실패 시 401 Unauthorized 에러를 발생시킴
      let err = new Error('인증되지 않았습니다, 토큰이 유효하지 않습니다.');
      err.statusCode = 401;
      next(err);
    }
  } else {
    // 토큰이 없거나 형식이 맞지 않는 경우 401 Unauthorized 에러를 발생시킴
    let error = new Error('인증되지 않았습니다, 토큰이 없습니다.');
    error.statusCode = 401;
    next(error);
  }
};

// 사용자가 관리자 권한을 가지고 있는지를 확인
export const adminGuard = (req, res, next) => {
  // 요청 객체에 user 속성이 존재하고 admin 속성이 true인 경우
  if (req.user && req.user.admin) {
    next();
  } else {
    let error = new Error('관리자 권한이 부여되지 않은 사용자입니다.');
    error.statusCode = 401;
    next(error);
  }
};
