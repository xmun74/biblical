import { Link, useParams } from 'react-router-dom';

const MeetingPosts = () => {
  const { meetId } = useParams();
  // 게시글 조회 API
  const testPosts = [
    {
      postId: 1,
      title: '제목입니다',
      content: '내용입니다',
      author: '닉네임',
      createdAt: '2023.09.09',
    },
    {
      postId: 2,
      title: '2제목입니다',
      content: '내용입니다',
      author: '닉네임',
      createdAt: '2023.09.09',
    },
  ];

  return (
    <main>
      <div className="flex justify-between mb-4">
        <div className="font-bold text-lg">게시글</div>
        <button>글쓰기</button>
      </div>
      <ul>
        {testPosts &&
          testPosts?.map(post => (
            <li className="py-6 m border-b" key={post.postId}>
              <Link to={`/meetings/${meetId}/posts/${post.postId}`}>
                <div className="font-semibold mb-2">{post.title}</div>
                <div className="text-slate-500 text-sm mb-2 line-clamp-1">{post.content}</div>
                <div className="text-slate-400 flex text-xs">
                  <div className="">{post.author}&nbsp; · &nbsp;</div>
                  <div className="">{post.createdAt}</div>
                </div>
              </Link>
            </li>
          ))}
      </ul>
    </main>
  );
};
export default MeetingPosts;
