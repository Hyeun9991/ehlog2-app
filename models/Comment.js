import { Schema, model } from 'mongoose';

const CommentSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    postId: {
      type: Schema.Types.ObjectId,
      ref: 'Post',
      required: true,
    },
    check: {
      type: Boolean,
      default: false,
    },
    parent: {
      type: Schema.Types.ObjectId,
      ref: 'Comment',
      default: null,
    },
    replyOnUser: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },
  },
  { timestamps: true },
);

// 가상 필드 'replies'를 정의
PostSchema.virtual('replies', {
  ref: 'Comment', // 'Comment' 모델을 참조
  localField: '_id', // 현재 모델의 '_id' 필드를 사용하여 매핑
  foreignField: 'parent', // 'Comment' 모델의 'parent' 필드와 연결
});

const Comment = model('Comment', CommentSchema);
export default Comment;
