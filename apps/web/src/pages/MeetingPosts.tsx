import { useModals } from '@biblical/react-ui';
import { Link, useParams } from 'react-router-dom';
import { modals } from '@/components/Modal/modals';
import { uploadPostAPI } from '@/lib/api';

const MeetingPosts = () => {
  const { meetId } = useParams();
  const { openModal } = useModals();
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

  const handleCreatePost = () => {
    openModal(modals.postCreateModal, {
      onSubmit: async (value: PostFormProps) => {
        const data = await uploadPostAPI(value);
        console.log('글쓰기 제출', data);
      },
    });
  };

  return (
    <main>
      <div className="flex justify-between mb-4">
        <div className="font-bold text-lg">게시글</div>
        <button className="hover_bg font-bold text-white px-3 py-2 rounded-md" onClick={handleCreatePost}>
          글쓰기
        </button>
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
