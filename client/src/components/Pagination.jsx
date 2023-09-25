import React from 'react';
import { DOTS, usePagination } from '../hooks/usePagination';

const Pagination = ({
  currentPage,
  siblingCount = 1,
  totalPageCount,
  onPageChange,
}) => {
  // usePagination 훅을 사용하여 페이지 범위를 계산
  const paginationRange = usePagination({
    currentPage,
    siblingCount,
    totalPageCount,
  });

  // 현재 페이지가 0이거나 페이지 범위가 2보다 작으면 null 반환하여 페이지네이션 UI를 숨김
  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  // 페이지 범위 배열에서 마지막 페이지 번호를 가져옴
  let lastPage = paginationRange[paginationRange.length - 1];

  return (
    <div className="flex justify-center w-full">
      <div className="flex">
        <button
          disabled={currentPage === 1}
          type="button"
          className="w-[28px] h-[28px] flex items-center justify-center text-xs font-semibold transition-all rounded-full text-textColor-light/90 hover:text-textColor-light hover:bg-black/5 disabled:cursor-not-allowed disabled:opacity-60"
          onClick={onPrevious}
        >
          <svg
            width="9"
            fill="currentColor"
            height="9"
            className=""
            viewBox="0 0 1792 1792"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M1427 301l-531 531 531 531q19 19 19 45t-19 45l-166 166q-19 19-45 19t-45-19l-742-742q-19-19-19-45t19-45l742-742q19-19 45-19t45 19l166 166q19 19 19 45t-19 45z"></path>
          </svg>
        </button>
        {paginationRange.map((pageNumber) => {
          if (pageNumber === DOTS) {
            return <button>&#8230;</button>;
          }

          return (
            <button
              type="button"
              className={`w-[28px] h-[28px] flex items-center justify-center text-xs font-semibold transition-all rounded-full ${
                pageNumber === currentPage
                  ? 'text-textColor-dark bg-bgColor-dark'
                  : 'text-textColor-light/90 hover:text-textColor-light hover:bg-black/5'
              }`}
              onClick={() => onPageChange(pageNumber)}
            >
              {pageNumber}
            </button>
          );
        })}
        <button
          disabled={currentPage === lastPage}
          type="button"
          className="w-[28px] h-[28px] flex items-center justify-center text-xs font-semibold transition-all rounded-full text-textColor-light/90 hover:text-textColor-light hover:bg-black/5 disabled:cursor-not-allowed disabled:opacity-60"
          onClick={onNext}
        >
          <svg
            width="9"
            fill="currentColor"
            height="8"
            className=""
            viewBox="0 0 1792 1792"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M1363 877l-742 742q-19 19-45 19t-45-19l-166-166q-19-19-19-45t19-45l531-531-531-531q-19-19-19-45t19-45l166-166q19-19 45-19t45 19l742 742q19 19 19 45t-19 45z"></path>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Pagination;
