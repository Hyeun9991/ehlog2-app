import { Schema, model } from 'mongoose';

const PostSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    caption: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    body: {
      type: Object,
      required: true,
    },
    photo: {
      type: String,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: false,
    },
    tags: {
      type: [String],
    },
    categories: [
      {
        type: Schema.Types.ObjectId,
        ref: 'PostCategories', // 'PostCategories' 모델을 참조
      },
    ],
  },
  { timestamps: true },
);

// 가상 필드 'comments'를 정의
PostSchema.virtual('comments', {
  ref: 'Comment', // 'Comment' 모델을 참조
  localField: '_id', // 현재 모델의 '_id' 필드를 사용하여 매핑
  foreignField: 'postId', // 'Comment' 모델의 'postId' 필드와 연결
});

const Post = model('Post', PostSchema);
export default Post;
