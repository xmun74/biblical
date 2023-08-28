import { useQuery } from '@tanstack/react-query';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AvatarImg from '@/components/AvatarImg';
import FollowBtn from '@/components/FollowBtn';
import Layout from '@/components/Layout';
import { getMeAPI, getUserAPI } from '@/lib/api';
import { PAGE_ROUTES, QUERY_KEYS } from '@/lib/constants';

const Profile = () => {
  const navigate = useNavigate();
  const { userId } = useParams();
  const [avatar, setAvatar] = useState('');
  const [isFollowers, setIsFollowers] = useState(0);
  // me
  const { data: MyInfoData } = useQuery<UserProps>([QUERY_KEYS.MY_INFO], getMeAPI, {
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    retry: 2,
  });

  const isMe: () => boolean = useCallback(() => {
    return Number(userId) === MyInfoData?.id ? true : false;
  }, [MyInfoData?.id, userId]);
  // 다른 유저
  const { data: otherInfoData, refetch } = useQuery<UserProps>(
    [QUERY_KEYS.OTHER_INFO],
    () => getUserAPI(Number(userId)),
    {
      enabled: Boolean(!isMe()),
    }
  );

  useEffect(() => {
    if (isMe()) {
      setIsFollowers(MyInfoData?.Followers.length);
      if (MyInfoData?.img) {
        setAvatar(`${MyInfoData?.img}`);
      } else {
        setAvatar('');
      }
    } else {
      refetch();
      setIsFollowers(otherInfoData?.Followers.length);
      if (otherInfoData?.img) {
        setAvatar(`${otherInfoData?.img}`);
      } else {
        setAvatar('');
      }
    }
  }, [
    MyInfoData?.Followers.length,
    MyInfoData?.img,
    isMe,
    otherInfoData?.Followers.length,
    otherInfoData?.img,
    refetch,
    userId,
  ]);

  return (
    <Layout>
      <div className="md:grid grid-cols-3 gap-2 ">
        {/* 왼쪽 */}
        <div className="md:sticky md:rounded-3xl md:mr-4 md:shadow-lg md:px-4 top-20 h-fit py-10 border-b mb-10 flex md:flex-col md:justify-center items-center">
          <AvatarImg src={avatar} size="xl" rounded="lg" />

          <div className="mb-6 md:mb-0 md:mt-6 ml-6 md:ml-0">
            <div className="font-bold text-xl md:text-2xl md:text-center mb-2">
              {isMe() ? MyInfoData?.nickname : otherInfoData?.nickname}
            </div>
            <div className="flex items-center text-sm md:justify-center mb-3">
              <div className="text-slate-400 font-light">팔로워 &nbsp;</div>
              <div className="font-semibold text-slate-600 min-w-[30px]">{isFollowers} &nbsp;</div>
              <div className="text-slate-400 font-light">팔로잉 &nbsp;</div>
              <div className="font-semibold text-slate-600">
                {isMe() ? MyInfoData?.Followings.length : otherInfoData?.Followings.length}
              </div>
            </div>

            {/* me */}
            {Number(userId) === MyInfoData?.id ? (
              <button
                type="submit"
                className="w-[150px] border bg-accent-500 rounded-md text-white text-md p-2 text-center font-semibold"
                onClick={() => navigate(PAGE_ROUTES.PROFILE_EDIT)}
              >
                정보 수정
              </button>
            ) : (
              <FollowBtn otherUserId={otherInfoData?.id} isFollowers={isFollowers} setIsFollowers={setIsFollowers} />
            )}
          </div>
        </div>

        {/* 오른쪽 */}
        <div className="md:rounded-3xl col-span-2 h-auto md:shadow-lg md:p-6 md:ml-20">
          <label className="block font-bold text-slate-700 mt-6 text-lg">
            게시글&nbsp;
            {isMe()
              ? MyInfoData?.Posts?.length > 0 && MyInfoData?.Posts?.length
              : otherInfoData?.Posts?.length > 0 && otherInfoData?.Posts.length}
          </label>
          <div className="mt-4">
            {isMe() ? (
              MyInfoData?.Posts?.length ? (
                <div>{MyInfoData?.Posts?.length}개의 게시글</div>
              ) : (
                <div className="flex justify-center font-light">게시글이 없습니다.</div>
              )
            ) : otherInfoData?.Posts?.length ? (
              <div>{otherInfoData?.Posts?.length}개의 게시글</div>
            ) : (
              <div className="flex justify-center font-light">게시글이 없습니다.</div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};
export default Profile;
