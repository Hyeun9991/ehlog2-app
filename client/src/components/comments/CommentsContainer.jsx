import React, { useState } from 'react';
import CommentForm from './CommentForm';
import Comment from './Comment';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  createNewComment,
  deleteComment,
  updateComment,
} from '../../services/index/comments';
import { useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';

const CommentsContainer = ({
  className,
  logginedUserId,
  comments,
  postSlug,
}) => {
  const queryClient = useQueryClient();
  const userState = useSelector((state) => state.user);

  const [affectedComment, setAffectedComment] = useState(null);

  /**
   * [새 댓글을 생성하는 작업을 수행, `createNewComment` 함수를 호출]
   */
  const { mutate: mutateNewComment, isLoading: isLoadingNewComment } =
    useMutation({
      mutationFn: ({ token, desc, slug, parent, replyOnUser }) => {
        return createNewComment({ token, desc, slug, parent, replyOnUser });
      },
      onSuccess: () => {
        toast.success(
          '댓글이 성공적으로 전송되었습니다. 관리자의 확인 후에 표시됩니다.',
        );
      },
      onError: (error) => {
        toast.error(error.message);
        console.log(error);
      },
    });

  /**
   * [댓글 내용을 업데이트하는 작업을 수행, `updateComment` 함수를 호출]
   */
  const { mutate: mutateUpdateComment } = useMutation({
    mutationFn: ({ token, desc, commentId }) => {
      return updateComment({ token, desc, commentId });
    },
    onSuccess: () => {
      toast.success('댓글이 성공적으로 업데이트되었습니다.');

      /**
       * 캐시된 데이터를 무효화(invalidate)하고 다시 불러오는 데 사용
       * 댓글이 업데이트된 후에 ['blog', postSlug] 쿼리를 무효화하여
       * 해당 블로그 게시물에 대한 정보를 다시 가져올 수 있도록 함
       */
      queryClient.invalidateQueries(['blog', postSlug]);
    },
    onError: (error) => {
      toast.error(error.message);
      console.log(error);
    },
  });

  /**
   * [댓글을 삭제하는 작업을 수행, `deleteComment` 함수를 호출]
   */
  const { mutate: mutateDeleteComment } = useMutation({
    mutationFn: ({ token, commentId }) => {
      return deleteComment({ token, commentId });
    },
    onSuccess: () => {
      toast.success('댓글이 성공적으로 삭제 되었습니다.');
      queryClient.invalidateQueries(['blog', postSlug]);
    },
    onError: (error) => {
      toast.error(error.message);
      console.log(error);
    },
  });

  /**
   * [댓글을 추가하는 핸들러 함수]
   * [parent] `null` = 최상위 댓글, `_id` 값이 들어가면 해당 댓글의 하위 댓글로 간주됨 /
   * [replyOnUser] `null` = 직접 게시물에 달린 댓글, `_id` 값이 들어가면 해당 사용자의 댓글에 답변하는 것으로 간주됨
   */
  const addCommentHandler = (value, parent = null, replyOnUser = null) => {
    mutateNewComment({
      desc: value,
      parent,
      replyOnUser,
      token: userState.userInfo.token,
      slug: postSlug,
    });
    setAffectedComment(null); // 댓글 추가 후 상태 초기화
  };

  /**
   * [댓글을 수정하는 핸들러 함수]
   * [value] 수정된 댓글 내용 /
   * [commentId] 어떤 댓글을 업데이트할지 식별하는데 사용됨
   */
  const updateCommentHandler = (value, commentId) => {
    mutateUpdateComment({
      token: userState.userInfo.token,
      desc: value,
      commentId,
    });
    setAffectedComment(null);
  };

  /**
   * [댓글을 삭제하는 핸들러 함수]
   * [commentId] 어떤 댓글을 업데이트할지 식별하는데 사용됨
   */
  const deleteCommentHandler = (commentId) => {
    mutateDeleteComment({
      token: userState.userInfo.token,
      commentId,
    });
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
      <CommentForm
        btnLabel="댓글 달기"
        formSubmitHandler={(value) => addCommentHandler(value)}
        loading={isLoadingNewComment}
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
