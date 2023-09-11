import React, { useEffect, useState } from 'react';
import CommentForm from './CommentForm';
import { getCommentsData } from '../../data/comments';
import Comment from './Comment';

const CommentsContainer = ({ className, logginedUserId, comments }) => {
  // const [comments, setComments] = useState([]);
  const [affectedComment, setAffectedComment] = useState(null);

  // const mainComments = comments.filter((comment) => comment.parent === null);

  // useEffect(() => {
  //   (async () => {
  //     const commentData = await getCommentsData();
  //     setComments(commentData);
  //   })();
  // }, []);

  /**
   * [`comments` 배열에 새로운 댓글 추가하는 함수]
   *
   * [parent]
   * 댓글이 어떤 댓글의 자식인지를 나타내는 필드
   * `null` = 최상위 댓글, `_id` 값이 들어가면 해당 댓글의 하위 댓글로 간주됨
   *
   * [replyOnUser]
   * 이 댓글이 다른 사용자의 댓글에 답변하는 것인지를 나타내는 필드
   * `null` = 직접 게시물에 달린 댓글, `_id` 값이 들어가면 해당 사용자의 댓글에 답변하는 것으로 간주됨
   */
  const addCommentHandler = (value, parent = null, replyOnUser = null) => {
    // const newComment = {
    //   _id: Math.random().toString(),
    //   user: {
    //     _id: 'a',
    //     name: 'A',
    //   },
    //   desc: value,
    //   post: '1',
    //   parent,
    //   replyOnUser,
    //   createdAt: new Date().toISOString(),
    // };

    // setComments((curState) => {
    //   return [newComment, ...curState];
    // });
    setAffectedComment(null);
  };

  /**
   * [수정한 내용을 기존 `comments` 배열에 추가하는 함수]
   *
   * `value`는 새로운 댓글 내용, `commentId`는 해당 댓글의 고유 식별자
   */
  const updateCommentHandler = (value, commentId) => {
    // const updatedComments = comments.map((comment) => {
    //   if (comment._id === commentId) {
    //     // 기존 댓글의 내용을 유지하면서 desc 속성을 새로운 value로 업데이트
    //     return { ...comment, desc: value };
    //   }

    //   // comment._id와 commentId가 일치하지 않으면
    //   // 해당 댓글은 변경하지 않고 원래 상태 그대로를 유지
    //   return comment;
    // });

    // setComments(updatedComments);
    setAffectedComment(null);
  };

  /**
   * [`commentId`에 해당하는 댓글을 삭제하는 함수]
   *
   * `commentId`는 해당 댓글의 고유 식별자
   */
  const deleteCommentHandler = (commentId) => {
    // comments 배열에서 commentId와 일치하지 않는 댓글만 선택해서 새로운 배열을 만듦
    // const updatedComments = comments.filter((comment) => {
    //   return comment._id !== commentId;
    // });
    // setComments(updatedComments);
  };

  /**
   * [commentId에 대한 모든 댓글의 답글을 가져오는 함수]
   *
   * 이제 필요없음, 백엔드에서 필터해서 가져올거기 때문에
   */
  // const getRepliesHandler = (commentId) => {
  //   // comments 배열에서 parent 속성이 주어진 commentId와 일치하는 댓글만을 선택하고,
  //   // 생성 날짜를 기준으로 정렬된 새로운 배열을 반환함
  //   return comments
  //     .filter((comment) => comment.parent === commentId)
  //     .sort((a, b) => {
  //       return (
  //         new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
  //       );
  //     });
  // };

  return (
    <div className={`${className}`}>
      <p className="mb-2 text-sm additional-text">댓글 {comments.length}개</p>
      <CommentForm
        btnLabel="댓글 달기"
        formSubmitHandler={(value) => addCommentHandler(value)}
      />
      <div className="mt-8 space-y-4">
        {comments.map((comment) => (
          <Comment
            key={comment._id}
            comment={comment}
            logginedUserId={logginedUserId}
            affectedComment={affectedComment}
            setAffectedComment={setAffectedComment}
            addComment={addCommentHandler}
            updateComment={updateCommentHandler}
            deleteComment={deleteCommentHandler}
            replies={comment.replies}
          />
        ))}
      </div>
    </div>
  );
};

export default CommentsContainer;
