import { uploadPicture } from '../middleware/uploadPictureMiddleware';
import User from '../models/User';
import { fileRemover } from '../utils/fileRemover';

// POST /api/users/register
const registerUser = async (req, res, next) => {
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

// POST /api/users/login
const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    let user = await User.findOne({ email });

    if (!user) {
      throw new Error('존재하지 않는 이메일입니다.');
    }

    if (await user.comparePassword(password)) {
      // 로그인에 성공하면 응답으로 사용자 정보와 토큰을 반환
      return res.status(201).json({
        _id: user._id,
        avatar: user.avatar,
        name: user.name,
        email: user.email,
        verified: user.verified,
        admin: user.admin,
        token: await user.generateJWT(),
      });
    } else {
      throw new Error('이메일 혹은 비밀번호가 일치하지 않습니다.');
    }
  } catch (error) {
    next(error);
  }
};

// POST /api/users/profile
const userProfile = async (req, res, next) => {
  try {
    let user = await User.findById(req.user._id); // authMiddleware

    if (user) {
      return res.status(201).json({
        _id: user._id,
        avatar: user.avatar,
        name: user.name,
        email: user.email,
        verified: user.verified,
        admin: user.admin,
      });
    } else {
      let error = new Error('사용자를 찾을 수 없습니다.');
      error.statusCode = 404;
      next(error);
    }
  } catch (error) {
    next(error);
  }
};

// POST /api/users/updateProfile
const updateProfile = async (req, res, next) => {
  try {
    let user = await User.findById(req.user._id);

    if (!user) {
      throw new Error('사용자를 찾을 수 없습니다.');
    }

    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    // 유저가 입력한 비밀번호가 있고, 6글자를 넘지 못했을 때 에러처리
    if (req.body.password && req.body.password.length < 6) {
      throw new Error('비밀번호는 6글자 이상이여야 합니다.');
    } else if (req.body.password) {
      // 유저가 입력한 비밀번호가 있고 6글자를 넘었을 때 유저의 비밀번호를 업데이트
      user.password = req.body.password;
    }

    const updateUserProfile = await user.save();

    res.json({
      _id: updateUserProfile._id,
      avatar: updateUserProfile.avatar,
      name: updateUserProfile.name,
      email: updateUserProfile.email,
      verified: updateUserProfile.verified,
      admin: updateUserProfile.admin,
      token: await updateUserProfile.generateJWT(),
    });
  } catch (error) {
    next(error);
  }
};

// POST /api/users/updateProfilePicture
const updateProfilePicture = async (req, res, next) => {
  try {
    // 'profilePicture' 필드 이름은 클라이언트에서 전송한 파일을 식별하는데 사용됨
    // 클라이언트가 'profilePicture' 필드로 파일을 전송해야 해당 업로드 설정이 작동함
    const upload = uploadPicture.single('profilePicture');

    upload(req, res, async function (err) {
      if (err) {
        // 업로드 중 에러가 발생했을 때
        const error = new Error(
          '파일 업로드 중 알 수 없는 에러가 발생했습니다.' + err.message,
        );
        next(error);
      } else {
        // 업로드가 성공했을 때

        // 업로드 된 파일이 있으면
        if (req.file) {
          let filename;
          let updatedUser = await User.findById(req.user._id); // 현재 사용자 정보를 가져옴

          filename = updatedUser.avatar; // 이전 프로필 사진 파일명 저장
          if (filename) {
            fileRemover(filename); // 이전 프로필 사진 파일 삭제 함수 호출
          }

          updatedUser.avatar = req.file.filename; // 새로운 프로필 사진 파일명으로 업데이트
          await updatedUser.save(); // 사용자 정보 저장

          res.json({
            _id: updatedUser._id,
            avatar: updatedUser.avatar,
            name: updatedUser.name,
            email: updatedUser.email,
            verified: updatedUser.verified,
            admin: updatedUser.admin,
            token: await updatedUser.generateJWT(),
          });
        } else {
          // 업로드된 파일이 없으면
          let filename;
          let updatedUser = await User.findById(req.user._id);

          filename = updatedUser.avatar; // 이전 프로필 사진 파일명 저장
          updatedUser.avatar = ''; // 프로필 사진을 초기화하고 이전 파일명을 삭제
          await updatedUser.save(); // 사용자 정보 저장
          fileRemover(filename); // 이전 프로필 사진 파일 삭제 함수 호출

          res.json({
            _id: updatedUser._id,
            avatar: updatedUser.avatar,
            name: updatedUser.name,
            email: updatedUser.email,
            verified: updatedUser.verified,
            admin: updatedUser.admin,
            token: await updatedUser.generateJWT(),
          });
        }
      }
    });
  } catch (error) {
    next(error);
  }
};

export {
  registerUser,
  loginUser,
  userProfile,
  updateProfile,
  updateProfilePicture,
};
