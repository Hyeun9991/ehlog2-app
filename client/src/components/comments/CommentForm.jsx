import React, { useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { images, stables } from '../../constants';

const CommentForm = ({
  btnLabel,
  formSubmitHandler,
  formCancelHandler = null,
  initialText = '',
  editingMode,
}) => {
  const textarea = useRef();
  const userState = useSelector((state) => state.user);

  const [value, setValue] = useState(initialText);

  const submitHandler = (event) => {
    event.preventDefault();
    formSubmitHandler(value);
    setValue('');
  };

  const handleResizeHeight = () => {
    textarea.current.style.height = 'auto'; // 높이 초기화
    textarea.current.style.height = textarea.current.scrollHeight + 'px';
  };

  return (
    <form onSubmit={submitHandler}>
      <div className="flex items-center gap-3 pt-3">
        {!editingMode && (
          <img
            src={
              userState.userInfo.avatar
                ? stables.UPLOAD_FOLDER_BASE_URL + userState.userInfo.avatar
                : images.sampleImage
            }
            alt="post profile"
            className="rounded-full w-9 h-9"
          />
        )}

        <div className="flex items-center flex-1">
          <textarea
            ref={textarea}
            placeholder={`${
              formCancelHandler ? '답글 달기...' : '댓글 달기...'
            }`}
            rows={1}
            value={value}
            className="flex items-center justify-center flex-1 text-sm bg-transparent outline-none resize-none max-h-[120px]"
            onChange={(e) => setValue(e.target.value)}
            onInput={handleResizeHeight}
          ></textarea>
          {value && (
            <button
              type="submit"
              className="text-sm font-semibold text-[#0496F6]"
            >
              {btnLabel}
            </button>
          )}
        </div>
      </div>
      {formCancelHandler && (
        // 답글달때만 나오게
        <button
          className={`${
            editingMode ? 'ml-0 mb-2' : ''
          }  text-xs font-semibold ml-[50px] transition-all opacity-50 cursor-pointer hover:opacity-100`}
          onClick={formCancelHandler}
        >
          취소
        </button>
      )}
    </form>
  );
};

export default CommentForm;
