import { Schema, model } from 'mongoose';
import { hash } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

const UserSchema = new Schema(
  {
    avatar: {
      type: String,
      default: '',
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    verificationCode: {
      type: String,
      required: false,
    },
    admin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

// 사용자 데이터 저장 전에 비밀번호를 해시화하여 저장하는 작업을 수행하는 UserSchema의 pre hook
UserSchema.pre('save', async function (next) {
  // password 필드가 변경되었을 경우에만 실행
  if (this.isModified('password')) {
    // 비밀번호를 해시화한 후 저장
    this.password = await hash(this.password, 10);
    return next();
  }

  // password 필드가 변경되지 않았다면 그냥 넘어감
  return next();
});

// JWT 토큰을 생성하는 메서드
UserSchema.methods.generateJWT = async function () {
  // 사용자 ID를 토대로 JWT 토큰 생성
  return await sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: '30d', // 토큰 유효 기간은 30일
  });
};

const User = model('User', UserSchema);
export default User;
