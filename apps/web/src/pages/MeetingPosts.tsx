import { useModals } from '@biblical/react-ui';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { deletePostAPI, getPostAPI, getPostsAPI, patchPostAPI, uploadPostAPI } from '@/apis';
import MoreOption from '@/assets/svg/MoreOption.svg';
import AvatarImg from '@/components/common/AvatarImg';
import { modals } from '@/components/Modal/modals';
import { QUERY_KEYS } from '@/constants';

const MeetingPosts = () => {
  const { meetId } = useParams();
  const navigate = useNavigate();
  const [optionOpen, setOptionOpen] = useState(false);
  const [clickItem, setClickItem] = useState<number>();
  const { openModal } = useModals();
  const queryClient = useQueryClient();
  const me = queryClient.getQueryData<User>([QUERY_KEYS.MY_INFO]);

  const { data: meetPosts } = useQuery<Post[]>([QUERY_KEYS.MEET_POSTS], () => getPostsAPI(Number(meetId)), {
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });

  const { mutate: postUpdateMutation } = useMutation(
    [QUERY_KEYS.MEET_POSTS],
    (params: { postId: number; value: PostFormProps }) => {
      const { postId, value } = params;
      return patchPostAPI(postId, value);
    },
    {
      onSuccess: () => queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.MEET_POSTS] }),
    }
  );

  const handleCreatePost = () => {
    openModal(modals.postCreateModal, {
      onSubmit: async (value: PostFormProps) => {
        const data = await uploadPostAPI(value);
        if (data.code === 201) {
          queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.MEET_POSTS] });
        }
        // console.log('글쓰기 제출', data);
      },
      meetId,
    });
  };

  const handlePostDetail = async (userId: number, postId: number) => {
    const post = await getPostAPI(postId);
    openModal(modals.postReadModal, {
      onAvatarClick: () => {
        navigate(`/users/${userId}`);
      },
      post,
    });
  };
  const handlePostUpdate = async (postId: number, meetId: number, preTitle: string, preContent: string) => {
    openModal(modals.postUpdateModal, {
      onSubmit: async (value: PostFormProps) => {
        postUpdateMutation({ postId, value });
      },
      meetId,
      preTitle,
      preContent,
    });
  };

  const handlePostDelete = async (postId: number, meetId: number) => {
    openModal(modals.postDeleteModal, {
      onClick: async () => {
        const data = await deletePostAPI(postId, meetId);
        if (data.code === 200) {
          queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.MEET_POSTS] });
          // console.log('삭제', data);
        }
      },
    });
  };

  const handleClickItem = (e: React.MouseEvent<HTMLElement>, id: number) => {
    setClickItem(id);
    setOptionOpen(!optionOpen);
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
          meetPosts?.map((post: Post) => (
            <li className="py-6 m border-b" key={post.id}>
              <div className="flex">
                <AvatarImg
                  src={post?.User?.img}
                  size="sm"
                  rounded="full"
                  onClick={() => navigate(`/users/${post.User?.id}`)}
                />
                <div className="w-full flex flex-col justify-between ml-3">
                  <div className="flex justify-between">
                    <div className="flex flex-col text-xs">
                      <Link
                        to={`/users/${post?.User?.id}`}
                        className="w-fit font-bold cursor-pointer hover:text-accent-400 mb-1 transition-all"
                      >
                        {post?.User?.nickname}
                      </Link>
                      <div className="text-slate-400">{post.createdAt.slice(0, -3)}</div>
                    </div>

                    {me?.id === post?.User?.id && (
                      <button className="relative" onClick={e => handleClickItem(e, post?.id)}>
                        <MoreOption fill="gray" width="20px" height="20px" />
                        {clickItem === post?.id && optionOpen && (
                          <div className="absolute right-0 p-1 w-[120px] bg-white rounded shadow-lg border tex">
                            <div
                              className="p-2 hover:bg-slate-50"
                              onClick={() => handlePostUpdate(post?.id, post?.MeetingId, post?.title, post?.content)}
                            >
                              수정하기
                            </div>
                            <div
                              className="p-2 hover:bg-slate-50"
                              onClick={() => handlePostDelete(post?.id, post?.MeetingId)}
                            >
                              삭제하기
                            </div>
                          </div>
                        )}
                      </button>
                    )}
                  </div>
                  <div className="mt-4 cursor-pointer" onClick={() => handlePostDetail(post?.User?.id, post.id)}>
                    <div className="font-semibold mb-2 text-xl">{post.title}</div>
                    <div className="text-xs text-slate-500 line-clamp-6">{post.content}</div>
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
