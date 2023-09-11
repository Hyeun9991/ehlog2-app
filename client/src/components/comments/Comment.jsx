import React, { useState } from 'react';
import { images, stables } from '../../constants';
import { HiOutlineDotsHorizontal } from 'react-icons/hi';
import CommentForm from './CommentForm';

const Comment = ({
  comment,
  logginedUserId,
  affectedComment,
  setAffectedComment,
  addComment,
  parentId = null,
  updateComment,
  deleteComment,
  replies,
}) => {
  const isUserLoggined = Boolean(logginedUserId); // 로그인을 헀는지 true & false
  const commentBelongsToUser = logginedUserId === comment.user._id; // 로그인 한 유저가 단 댓글
  const isReplying =
    affectedComment &&
    affectedComment.type === 'replying' &&
    affectedComment._id === comment._id;
  const isEditing =
    affectedComment &&
    affectedComment.type === 'editing' &&
    affectedComment._id === comment._id;
  const repliedCommentId = parentId ? parentId : comment._id; // 답글이 달린 댓글의 아이디
  const replyOnUserId = comment.user._id; // 메인 댓글 유저 아이디

  const [isClicked, setIsClicked] = useState(false);
  const [isMoreButtonClicked, setIsMoreButtonClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(!isClicked);
  };

  const handleMoreButtonClick = () => {
    setIsMoreButtonClicked(!isMoreButtonClicked);
  };

  return (
    <div
      className={`flex items-start justify-center group flex-nowrap gap-x-2.5 ${
        replies ? 'mb-4' : ''
      }`}
    >
      {/* 프로필 사진 */}
      <img
        src={
          comment?.user?.avatar
            ? stables.UPLOAD_FOLDER_BASE_URL + comment.user.avatar
            : images.sampleProfile
        }
        alt="user profile"
        className="object-cover mt-[2px] rounded-full w-9 h-9"
      />
      <div className="flex flex-col flex-1">
        {/* 유저 정보 */}
        <div className="flex items-center gap-1 text-xs">
          <h5 className="font-semibold">{comment.user.name}</h5>
          <span className="opacity-50">
            {new Date(comment.createdAt).toLocaleDateString('ko-KR', {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
              weekday: 'short',
              hour: '2-digit',
            })}
          </span>
        </div>

        {/* 댓글 내용 */}
        {!isEditing && (
          <p className="mt-1.5 text-sm text-textColor-light">{comment.desc}</p>
        )}
        {isEditing && (
          <CommentForm
            btnLabel="수정 하기"
            formSubmitHandler={(value) => updateComment(value, comment._id)}
            formCancelHandler={() => setAffectedComment(null)}
            initialText={comment.desc}
            editingMode
          />
        )}

        {/* 버튼 */}
        <div className="flex items-center mt-1.5 gap-x-3 text-textColor-light">
          {/* 답글 달기 버튼 */}
          {isUserLoggined && (
            <button
              className="text-xs font-semibold transition-all opacity-50 hover:opacity-100"
              onClick={() =>
                setAffectedComment({ type: 'replying', _id: comment._id })
              }
            >
              <span>답글 달기</span>
            </button>
          )}

          {/* 메뉴 & 취소 & 삭제 버튼 */}
          {commentBelongsToUser && (
            <div className="flex items-center gap-2">
              {isClicked ? (
                <span
                  onClick={handleClick}
                  className="mr-1 text-xs font-semibold transition-all opacity-50 cursor-pointer hover:opacity-100"
                >
                  닫기
                </span>
              ) : (
                <HiOutlineDotsHorizontal
                  className="hidden transition-all opacity-50 cursor-pointer group-hover:block hover:opacity-100"
                  onClick={handleClick}
                />
              )}

              {isClicked && (
                <div className="flex items-center gap-1 text-xs font-semibold text-textColor-light">
                  <button
                    className="transition-all opacity-50 hover:opacity-100"
                    onClick={() =>
                      setAffectedComment({ type: 'editing', _id: comment._id })
                    }
                  >
                    수정
                  </button>
                  <span className="text-xs opacity-50">·</span>
                  <button
                    className="text-red-500"
                    onClick={() => deleteComment(comment._id)}
                  >
                    삭제
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
        {/* 답글 보기 버튼 */}
        {replies.length > 0 && (
          <div
            className={`${
              isMoreButtonClicked ? 'mb-2' : ''
            } flex items-center gap-6 mt-4`}
            onClick={handleMoreButtonClick}
          >
            <div className="relative h-[1px] mr-3">
              <div className="absolute top-0 left-0 w-[25px] h-full bg-bgColor-dark opacity-10"></div>
            </div>
            <button className="text-xs font-semibold opacity-50 text-start hover-text">
              {isMoreButtonClicked
                ? '답글 모두 숨기기'
                : `답글 ${replies.length}개 모두 보기`}
            </button>
          </div>
        )}

        {/* 댓글 폼 */}
        {isReplying && (
          <CommentForm
            btnLabel="답글 달기"
            formSubmitHandler={(value) =>
              addComment(value, repliedCommentId, replyOnUserId)
            }
            formCancelHandler={() => setAffectedComment(null)}
          />
        )}

        {/* 답 댓글 */}
        {replies.length > 0 && isMoreButtonClicked && (
          <div className="mt-2">
            {replies.map((reply) => (
              <Comment
                key={reply._id}
                addComment={addComment}
                affectedComment={affectedComment}
                setAffectedComment={setAffectedComment}
                comment={reply}
                deleteComment={deleteComment}
                logginedUserId={logginedUserId}
                replies={[]}
                updateComment={updateComment}
                parentId={comment._id}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Comment;
