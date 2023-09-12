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

// DELETE /api/comments/:commentId
const deleteComment = async (req, res, next) => {
  try {
    // 요청 파라미터에서 commentId를 사용하여 댓글을 찾고 삭제
    const comment = await Comment.findByIdAndDelete(req.params.commentId);

    // 메인 댓글의 답 댓글도 모두 삭제
    await Comment.deleteMany({ parent: comment._id });

    if (!comment) {
      const error = new Error('댓글을 찾을 수 없습니다.');
      return next(error);
    }

    return res.json({
      message: '댓글을 성공적으로 삭제했습니다.',
    });
  } catch (error) {
    next(error);
  }
};

export { createComment, updateComment, deleteComment };
