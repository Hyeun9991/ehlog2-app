import Comment from '../models/Comment';
import Post from '../models/Post';

// POST /api/comments
const createComment = async (req, res, next) => {
  try {
    const { desc, slug, parent, replyOnUser } = req.body;

    const post = await Post.findOne({ slug: slug });

    if (!post) {
      const error = new Error('게시물을 찾을 수 없습니다.');
      return next(error);
    }

    const newComment = new Comment({
      user: req.user._id,
      desc,
      post: post._id,
      parent,
      replyOnUser,
    });

    const savedComment = await newComment.save();

    return res.json(savedComment);
  } catch (error) {
    next(error);
  }
};

// PUT /api/comments/:commentId
const updateComment = async (req, res, next) => {
  try {
    const { desc } = req.body;

    const comment = await Comment.findById(req.params.commentId);

    if (!comment) {
      const error = new Error('댓글을 찾을 수 없습니다.');
      return next(error);
    }

    comment.desc = desc || comment.desc;

    const updatedComment = await comment.save();

    return res.json(updatedComment);
  } catch (error) {
    next(error);
  }
};

export { createComment, updateComment };
