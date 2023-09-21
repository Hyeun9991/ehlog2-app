import Post from '../models/Post';
import Comment from '../models/Comment';
import { uploadPicture } from '../middleware/uploadPictureMiddleware';
import { fileRemover } from '../utils/fileRemover';
import { v4 as uuidv4 } from 'uuid';

// POST /api/posts
const createPost = async (req, res, next) => {
  try {
    // 새로운 게시물 객체 생성
    const post = new Post({
      title: 'sample title',
      caption: 'sample caption',
      slug: uuidv4(),
      body: {
        type: 'doc',
        content: [],
      },
      photo: '',
      user: req.user._id,
    });

    // 게시물 저장 및 생성된 게시물 반환
    const createPost = await post.save();

    // 생성된 게시물을 JSON 형식으로 응답
    return res.json(createPost);
  } catch (error) {
    // 에러가 발생한 경우 다음 미들웨어로 에러를 전달
    next(error);
  }
};

// PUT /api/posts/:slug
const updatePost = async (req, res, next) => {
  try {
    // 슬러그로 게시글 찾음
    const post = await Post.findOne({ slug: req.params.slug });

    if (!post) {
      const error = new Error('게시물을 찾을 수 없습니다');
      next(error);
      return;
    }

    // 이미지 업로드를 처리하는 미들웨어 생성 (uploadPicture 함수 사용)
    const upload = uploadPicture.single('postPicture');

    // 업데이트된 게시물 데이터를 처리하는 함수
    const handleUpdatePostData = async (data) => {
      const { title, caption, slug, body, tags, categories } = JSON.parse(data);

      // 새로운 데이터로 게시물 업데이트
      post.title = title || post.title;
      post.caption = caption || post.caption;
      post.slug = slug || post.slug;
      post.body = body || post.body;
      post.tags = tags || post.tags;
      post.categories = categories || post.categories;

      // 업데이트된 게시물을 저장하고 응답
      const updatedPost = await post.save();

      return res.json(updatedPost);
    };

    // 이미지 업로드 수행
    upload(req, res, async function (err) {
      if (err) {
        // 업로드 중 에러가 발생했을 때
        const error = new Error(
          '파일 업로드 중 알 수 없는 에러가 발생했습니다.' + err.message,
        );
        next(error);
      } else {
        // 업로드가 성공한 경우

        // 업로드 된 파일이 있으면
        if (req.file) {
          let filename;

          filename = post.photo; // 이전 포스트 사진 저장
          if (filename) {
            fileRemover(filename); // 이전 포스트 사진 파일 삭제 함수 호출
          }

          post.photo = req.file.filename; // 새로운 포스트 사진 파일명으로 업데이트
          handleUpdatePostData(req.body.document);
        } else {
          // 업로드된 파일이 없으면
          let filename;

          filename = post.photo; // 이전 포스트 사진 파일명 저장
          post.photo = ''; // 포스트 사진을 초기화하고 이전 파일명을 삭제
          fileRemover(filename); // 이전 포스트 사진 파일 삭제 함수 호출
          handleUpdatePostData(req.body.document);
        }
      }
    });
  } catch (error) {
    // 에러가 발생한 경우 다음 미들웨어로 에러를 전달
    next(error);
  }
};

// DELETE /api/posts/:slug
const deletePost = async (req, res, next) => {
  try {
    const post = await Post.findOneAndDelete({ slug: req.params.slug });

    if (!post) {
      const error = new Error('게시물을 찾을 수 없습니다');
      return next(error);
    }

    // 게시물이 성공적으로 삭제되면 해당 게시물에 연결된 모든 댓글을 삭제
    await Comment.deleteMany({ post: post._id });

    return res.json({
      message: '게시글이 성공적으로 삭제되었습니다.',
    });
  } catch (error) {
    next(error);
  }
};

// GET /api/posts/:slug
const getPost = async (req, res, next) => {
  try {
    const post = await Post.findOne({ slug: req.params.slug }).populate([
      {
        path: 'user', // user 필드와 관련된 정보를 가져옴
        select: ['avatar', 'name'], // 아바타(avatar), 이름(name) 정보가 포함
      },
      {
        path: 'comments', // 부모 댓글
        match: {
          // match 옵션을 사용하여 check가 true이고 parent가 null인 댓글만 가져옴
          check: true,
          parent: null,
        },
        populate: [
          {
            path: 'user',
            select: ['avatar', 'name'],
          },
          {
            path: 'replies', // 자식 댓글
            match: {
              check: true,
            },
            populate: [
              {
                path: 'user',
                select: ['avatar', 'name'],
              },
            ],
          },
        ],
      },
    ]);

    if (!post) {
      const error = new Error('게시글을 찾을 수 없습니다.');
      return next(error);
    }

    return res.json(post);
  } catch (error) {
    next(error);
  }
};

// GET /api/posts
const getAllPosts = async (req, res, next) => {
  try {
    const filter = req.query.searchKeyword; // 클라이언트로부터 받은 검색어
    let where = {};

    // 만약 검색어가 존재한다면, 검색어를 포함하는 제목을 찾음
    if (filter) {
      where.title = { $regex: filter, $options: 'i' };
    }

    // 검색 조건을 기반으로 데이터베이스에서 게시물을 찾음
    let query = Post.find(where);

    // 페이지 및 페이지 크기 관련 변수 설정
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * pageSize;

    // 전체 게시물 수 계산
    const total = await Post.countDocuments();
    const pages = Math.ceil(total / pageSize);

    // 요청된 페이지가 존재하지 않으면 오류를 반환
    if (page > pages) {
      const error = new Error('페이지를 찾을 수 없습니다.');
      return next(error);
    }

    // 게시물 쿼리 실행 및 관련 사용자 정보 팝업레이션
    const result = await query
      .skip(skip)
      .limit(pageSize)
      .populate([
        {
          path: 'user',
          select: ['avatar', 'name', 'verified'],
        },
      ]);

    // 응답 헤더에 필터, 총 게시물 수 및 페이지 관련 정보 추가
    res.header({
      'x-filter': encodeURIComponent(filter), // 한글 검색어를 인코딩하여 응답 헤더에 추가
      'x-totalcount': JSON.stringify(total),
      'x-currentpage': JSON.stringify(page),
      'x-pagesize': JSON.stringify(pageSize),
      'x-totalpagecount': JSON.stringify(pages),
    });

    return res.json(result);
  } catch (error) {
    next(error);
  }
};

export { createPost, updatePost, deletePost, getPost, getAllPosts };
