import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import Pagination from '../../../../components/Pagination';
import { images, stables } from '../../../../constants';
import { getAllPosts } from '../../../../services/index/posts';

let isFirstRun = true;

const ManagePost = () => {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const {
    data: postsData,
    isLoading,
    isFetching,
    refetch,
  } = useQuery({
    queryFn: () => getAllPosts(searchKeyword, currentPage),
    queryKey: ['posts'],
  });

  useEffect(() => {
    // 게시물 데이터를 새로 고치는 것을 방지
    if (isFirstRun) {
      isFirstRun = false;
      return;
    }

    // currentPage가 변경될 때마다 refetch 함수를 호출하여 데이터를 새로고침
    refetch();
  }, [refetch, currentPage]);

  // 검색 키워드 입력 핸들러
  const searchKeywordHandler = (event) => {
    const { value } = event.target;
    setSearchKeyword(value);
  };

  /**
   * [검색어 제출 핸들러]
   *
   * [에러]
   * 마지막 페이지에서 첫 번째 게시물을 검색할 때 아무것도 출력이 안됨
   * 실제로는 검색이 되지만 페이지가 첫 번째 페이지로 변경이 되지 않음.
   *
   * [해결]
   * 검색할때마다 현재 페이지를 재설정
   */
  const submitSearchKeywordHandler = (event) => {
    event.preventDefault();
    setCurrentPage(1); // 검색 시 현재 페이지를 1로 설정
    refetch(); // 데이터 새로 고침
  };

  return (
    <div className="flex flex-col w-full gap-6 cursor-default ">
      <h1 className="title-2xl">포스트 관리하기</h1>
      <div>
        <div className="flex flex-col gap-3">
          {/* 검색어 입력창 */}
          <div className="flex flex-row justify-between w-full sm:mb-0">
            <div className="flex justify-end w-full">
              <form
                className="flex gap-3"
                onSubmit={submitSearchKeywordHandler}
              >
                <div className="relative">
                  <input
                    type="text"
                    id='"form-subscribe-Filter'
                    className="p-3 py-2 text-xs font-semibold transition-all border rounded-sm outline-none sm:text-sm focus:border-2 lack/30 focus:border-black placeholder:font-light"
                    placeholder="포스트 제목을 입력하세요."
                    value={searchKeyword}
                    onChange={searchKeywordHandler}
                  />
                </div>
                <button className="secondary-button" type="submit">
                  검색
                </button>
              </form>
            </div>
          </div>

          {/* 포스트 데이터 */}
          <div className="p-2 overflow-x-auto bg-white rounded">
            <div className="inline-block min-w-full overflow-hidden">
              <table className="min-w-full leading-normal">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className="p-3 text-xs text-left sm:text-sm text-textColor-light"
                    >
                      제목
                    </th>
                    <th
                      scope="col"
                      className="p-3 text-xs text-left sm:text-sm text-textColor-light"
                    >
                      카테고리
                    </th>
                    <th
                      scope="col"
                      className="p-3 text-xs text-left sm:text-sm text-textColor-light"
                    >
                      작성일
                    </th>
                    <th
                      scope="col"
                      className="p-3 text-xs text-left sm:text-sm text-textColor-light"
                    >
                      태그
                    </th>
                    <th
                      scope="col"
                      className="p-3 text-xs text-left sm:text-sm text-textColor-light"
                    ></th>
                  </tr>
                </thead>
                <tbody>
                  {isLoading || isFetching ? (
                    <tr>
                      <td
                        colSpan={5}
                        className="w-full text-xs font-light sm:text-sm textColor-light text-textColor-light dark:text-textColor-dark"
                      >
                        loading...
                      </td>
                    </tr>
                  ) : (
                    postsData?.data.map((post) => (
                      <tr className="font-light" key={post.id}>
                        <td className="p-3 text-xs sm:text-sm text-textColor-light lack/5">
                          <div className="flex flex-wrap items-center gap-2">
                            <div className="flex-shrink-0">
                              <a href="/" className="relative block">
                                <img
                                  alt={post.title}
                                  src={
                                    post?.image
                                      ? stables.UPLOAD_FOLDER_BASE_URL +
                                        post?.image
                                      : images.bear3
                                  }
                                  className="object-cover w-8 h-8 mx-auto rounded-sm aspect-square"
                                />
                              </a>
                            </div>
                            <div>
                              <p className="text-gray-900 whitespace-no-wrap">
                                {post.title}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="p-3 text-xs sm:text-sm text-textColor-light lack/5">
                          <div className="text-gray-900 whitespace-no-wrap">
                            {post.categories.length > 0 ? (
                              post.categories[0]
                            ) : (
                              <p className="opacity-50">카테고리 없음</p>
                            )}
                          </div>
                        </td>
                        <td className="p-3 text-xs sm:text-sm text-textColor-light lack/5">
                          <p className="text-gray-900 whitespace-no-wrap">
                            {new Date(post.createdAt).toLocaleDateString(
                              'ko-KR',
                              {
                                year: 'numeric',
                                month: '2-digit',
                                day: '2-digit',
                                weekday: 'short',
                                hour: '2-digit',
                              },
                            )}
                          </p>
                        </td>
                        <td className="p-3 text-xs sm:text-sm text-textColor-light lack/5">
                          <div className="flex flex-wrap gap-2">
                            {post.tags.length > 0 ? (
                              post.tags.map((tag, index) => (
                                <p
                                  key={index}
                                  className="p-1 text-xs font-semibold transition-all rounded-sm sm:text-sm bg-bgColor-dark text-textColor-dark"
                                >
                                  {tag}
                                </p>
                              ))
                            ) : (
                              <p className="opacity-50">태그 없음</p>
                            )}
                          </div>
                        </td>
                        <td className="p-3 text-xs sm:text-sm text-textColor-light lack/5">
                          <a
                            href="/"
                            className="text-indigo-600 hover:text-indigo-900"
                          >
                            Edit
                          </a>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* 페이지네이션 */}
          {!isLoading && (
            <Pagination
              onPageChange={(page) => setCurrentPage(page)}
              currentPage={currentPage}
              totalPageCount={JSON.parse(
                postsData?.headers?.['x-totalpagecount'],
              )}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ManagePost;
