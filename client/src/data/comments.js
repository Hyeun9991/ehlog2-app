export const getCommentsData = async () => {
  return [
    {
      _id: '1',
      user: {
        _id: 'a',
        name: 'A',
      },
      desc: '첫 번째 댓글',
      post: '1',
      parent: null,
      replyOnUser: null,
      createdAt: '2023-09-07T17:22:05.092+0000',
    },
    {
      _id: '2',
      user: {
        _id: 'b',
        name: 'B',
      },
      desc: '두 번째 댓글',
      post: '1',
      parent: '1',
      replyOnUser: 'a',
      createdAt: '2023-09-07T17:22:05.092+0000',
    },
    {
      _id: '3',
      user: {
        _id: 'c',
        name: 'C',
      },
      desc: '세 번째 댓글',
      post: '1',
      parent: null,
      replyOnUser: null,
      createdAt: '2023-09-07T17:22:05.092+0000',
    },
    {
      _id: '4',
      user: {
        _id: 'd',
        name: 'D',
      },
      desc: '네 번째 댓글',
      post: '1',
      parent: null,
      replyOnUser: null,
      createdAt: '2023-09-07T17:22:05.092+0000',
    },
  ];
};
