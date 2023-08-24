import { useModals } from '@biblical/react-ui';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import AvatarImg from '@/components/AvatarImg';
import { modals } from '@/components/Modal/modals';
import { getPostsAPI, uploadPostAPI } from '@/lib/api';
import { QUERY_KEYS } from '@/lib/constants';

const MeetingPosts = () => {
  const { meetId } = useParams();
  const { openModal } = useModals();

  const { data: meetPosts, refetch } = useQuery<PostProps[]>(
    [QUERY_KEYS.MEET_POSTS],
    () => getPostsAPI(Number(meetId)),
    {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
    }
  );
  useEffect(() => {
    refetch();
  }, [meetId, refetch]);

  const handleCreatePost = () => {
    openModal(modals.postCreateModal, {
      onSubmit: async (value: PostFormProps) => {
        const data = await uploadPostAPI(value);
        console.log('글쓰기 제출', data);
      },
      meetId,
    });
  };

  const handleClickPost = (postId: number) => {
    console.log('클릭 :', postId);
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
        {meetPosts &&
          meetPosts?.map((post: PostProps) => (
            <li className="py-6 m border-b" key={post.id}>
              <div className="flex">
                <AvatarImg src={post?.User?.img} userId={post.User?.id} size="sm" rounded="full" />
                <div className="flex flex-col justify-between text-xs ml-3">
                  <Link
                    to={`/users/${post?.User?.id}`}
                    className="w-fit font-bold cursor-pointer hover:text-accent-400 mb-1 transition-all"
                  >
                    {post?.User?.nickname}
                  </Link>
                  <div className="text-slate-400">{post.createdAt}</div>
                  <div className="mt-4 cursor-pointer" onClick={() => handleClickPost(post.id)}>
                    <div className="font-semibold mb-2 text-xl">{post.title}</div>
                    <div className="text-slate-500 text-sm line-clamp-6">{post.content}</div>
                  </div>
                </div>
              </div>
            </li>
          ))}
      </ul>
    </main>
  );
};
export default MeetingPosts;
