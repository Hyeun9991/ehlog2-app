import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { images, stables } from '../../../../constants';
import { getAllPosts } from '../../../../services/index/posts';

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

  const searchKeywordHandler = (event) => {
    const { value } = event.target;
    setSearchKeyword(value);
  };

  const submitSearchKeywordHandler = (event) => {
    event.preventDefault();
    refetch();
  };

  return (
    <div className="flex flex-col w-full gap-6 cursor-default ">
      <h1 className="title-2xl">포스트 관리하기</h1>
      <div>
        <div className="flex flex-col gap-3">
          <div className="flex flex-row justify-between w-full sm:mb-0">
            {/* <h2 className="text-2xl leading-tight">Users</h2> */}
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
          <div className="flex justify-center w-full">
            <div className="flex">
              <button
                type="button"
                className="w-[28px] h-[28px] flex items-center justify-center text-xs font-semibold transition-all rounded-full text-textColor-light/90 hover:text-textColor-light hover:bg-black/5"
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
              <button
                type="button"
                className="w-[28px] h-[28px] flex items-center justify-center text-xs font-semibold transition-all rounded-full text-textColor-dark bg-bgColor-dark hover:bg-black hover:text-textColor-dark"
              >
                1
              </button>
              <button
                type="button"
                className="w-[28px] h-[28px] flex items-center justify-center text-xs font-semibold transition-all rounded-full text-textColor-light/90 hover:text-textColor-light hover:bg-black/5"
              >
                2
              </button>
              <button
                type="button"
                className="w-[28px] h-[28px] flex items-center justify-center text-xs font-semibold transition-all rounded-full text-textColor-light/90 hover:text-textColor-light hover:bg-black/5"
              >
                3
              </button>
              <button
                type="button"
                className="w-[28px] h-[28px] flex items-center justify-center text-xs font-semibold transition-all rounded-full text-textColor-light/90 hover:text-textColor-light hover:bg-black/5"
              >
                4
              </button>
              <button
                type="button"
                className="w-[28px] h-[28px] flex items-center justify-center text-xs font-semibold transition-all rounded-full text-textColor-light/90 hover:text-textColor-light hover:bg-black/5"
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
        </div>
      </div>
    </div>
  );
};

export default ManagePost;
