import { useMemo } from 'react';

export const DOTS = '...';

/**
 * 렌더링하려는 페이지 수 구하기
 * @param {object} param0 - 페이지네이션 설정을 담고 있는 객체
 * @param {number} [param0.siblingCount=1] - 현재 페이지 양쪽에 표시될 형제 페이지 수 (선택 사항)
 * @param {number} param0.currentPage - 현재 페이지 번호
 * @param {number} [param0.totalPageCount] - 전체 페이지 수 (선택 사항)
 * @returns {number[]} 페이지 번호의 범위를 나타내는 배열을 반환
 */
export const usePagination = ({
  siblingCount = 1,
  currentPage,
  totalPageCount,
}) => {
  /**
   * 계산 비용이 많이 드는 연산을 최적하기 위해서 useMemo 사용
   * 특정 값 메모이제이션하고, 이 값이 필요할 때 이전에 계산한 값을 재사용하여 성능을 향상시킬 수 있음.
   */
  const paginationRange = useMemo(() => {
    const totalPageNumbers = siblingCount + 5; // 현재 페이지 양쪽에 형제 페이지와 5개의 다른 페이지 번호를 표시하려고 함

    // State 1: 페이지 수가 표시하려는 페이지 번호의 총 개수보다 작을 때
    // < 1 2 3 4 5 >
    if (totalPageNumbers >= totalPageCount) {
      return range(1, totalPageCount);
    }

    // 왼쪽 형제 페이지와 오른쪽 형제 페이지의 인덱스를 계산
    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1); // 음수가 나오지 않게 최소값을 1로 유지
    const rightSiblingIndex = Math.min(
      currentPage + siblingCount,
      totalPageCount,
    ); // 오른쪽 형제 페이지가 전체 페이지 수를 초과하지 않도록 최대값을 전체 페이지 수로 제한

    // 왼쪽 점, 오른쪽 점 또는 둘 다 표시할지 여부를 계산
    // 형제와 페이지 제한 사이에 삽입할 페이지 번호가 하나만 있는 경우에는 점을 표시하지 않음
    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < totalPageCount - 2;

    const firstPageIndex = 1;
    const lastPageIndex = totalPageCount;

    // State 2: 왼쪽에 점 표시 없음, 오른쪽에 점 표시
    // < 1 2 3 4 5 ... 80 >
    if (!shouldShowLeftDots && shouldShowRightDots) {
      let leftItemCount = 3 + 2 * siblingCount;
      let leftRange = range(1, leftItemCount);

      return [...leftRange, DOTS, totalPageCount];
    }

    // State 3: 오른쪽에 점 표시 없음, 왼쪽에 점 표시
    // < 1 ... 76 77 78 79 80 >
    if (shouldShowLeftDots && !shouldShowRightDots) {
      let rightItemCount = 3 + 2 * siblingCount;
      let rightRange = range(
        totalPageCount - rightItemCount + 1,
        totalPageCount,
      );

      return [firstPageIndex, DOTS, ...rightRange];
    }

    // State 4: 왼쪽 및 오른쪽 점 모두 표시
    if (shouldShowLeftDots && shouldShowRightDots) {
      let middleRange = range(leftSiblingIndex, rightSiblingIndex);

      return [firstPageIndex, DOTS, middleRange, DOTS, lastPageIndex];
    }
  }, [siblingCount, currentPage, totalPageCount]);

  return paginationRange;
};

/**
 * 숫자의 범위를 배열로 반환하는 함수
 * @param {number} start - 시작 숫자
 * @param {number} end - 종료 숫자
 * @returns {number[]} 시작과 끝을 포함하는 숫자의 배열을 반환
 */
function range(start, end) {
  const length = end - start + 1; // 시작 숫자부터 종료 숫자까지의 모든 숫자를 포함해야 하므로, 시작 숫자에서 종료 숫자를 뺀 후 1을 더하여 올바른 범위를 계산

  // 주어진 범위 내의 숫자 배열을 생성
  // ex) 'asdadsad' => ['a', 's', 'd' ...] 이런식으로 출력
  return Array.from({ length }, (value, index) => index + start);
}
