import User from '../models/User';

export const registerUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    // 데이터베이스에 이메일이 있는지 체크
    let user = await User.findOne({ email });

    // 이미 등록된 이메일이 있으면 에러를 발생시킴
    if (user) {
      throw new Error('이미 존재하는 이메일입니다.');
    }

    // 등록되지 않은 이메일인 경우, 새로운 사용자를 데이터베이스에 등록
    user = await User.create({
      name,
      email,
      password,
    });

    // 사용자 등록에 성공하면 응답으로 사용자 정보와 토큰을 반환
    return res.status(201).json({
      _id: user._id,
      avatar: user.avatar,
      name: user.name,
      email: user.email,
      verified: user.verified,
      admin: user.admin,
      token: await user.generateJWT(),
    });
  } catch (error) {
    // 에러가 발생한 경우 다음 미들웨어로 에러를 전달
    next(error);
  }
};

export { registerUser };
