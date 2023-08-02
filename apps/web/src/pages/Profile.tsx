import { useQuery } from '@tanstack/react-query';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import FollowBtn from '@/components/FollowBtn';
import User from '@/interfaces/user';
import { getMeAPI, getUserAPI } from '@/lib/api';
import { PAGE_ROUTES } from '@/lib/constants';

const Profile = () => {
  const navigate = useNavigate();
  const { userId } = useParams();
  const [avatar, setAvatar] = useState(
    'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
  );
  const [isFollowers, setIsFollowers] = useState(0);
  // me
  const { data: MyInfoData } = useQuery<User>(['userInfo'], getMeAPI, {
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    retry: 2,
  });

  const isMe: () => boolean = useCallback(() => {
    return Number(userId) === MyInfoData?.id ? true : false;
  }, [MyInfoData?.id, userId]);

  // 다른 유저
  const { data: otherInfoData } = useQuery<User>(['otherUserInfo'], () => getUserAPI(Number(userId)), {
    enabled: Boolean(!isMe()),
  });

  useEffect(() => {
    if (isMe()) {
      setIsFollowers(MyInfoData?.Followers.length);
      if (MyInfoData?.img) {
        setAvatar(`${process.env.API_URL}${MyInfoData?.img}`);
      } else {
        setAvatar(`https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png`);
      }
    } else {
      setIsFollowers(otherInfoData?.Followers.length);
      if (otherInfoData?.img) {
        setAvatar(`${process.env.API_URL}${otherInfoData?.img}`);
      } else {
        setAvatar(`https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png`);
      }
    }
  }, [
    MyInfoData?.Followers.length,
    MyInfoData?.img,
    isMe,
    otherInfoData?.Followers.length,
    otherInfoData?.img,
    userId,
  ]);

  return (
    <div className="md:grid grid-cols-3 gap-2 h-auto px-[40px] lg:mx-auto lg:max-w-[1256px]">
      {/* 왼쪽 */}
      <div className="md:sticky md:rounded-3xl md:mr-4 md:shadow-lg md:px-4 top-20 h-fit py-10 border-b mb-10 flex md:flex-col md:justify-center items-center">
        <img
          className="justify-center bg-slate-100 w-[125px] h-[125px] rounded-[42px] object-cover mb-6 mr-6 md:mr-0"
          src={avatar}
          alt="profile image"
        />

        <div>
          <div className="font-bold text-xl md:text-2xl md:text-center mb-2">
            {isMe() ? MyInfoData?.nickname : otherInfoData?.nickname}
          </div>
          <div className="flex items-center text-sm md:justify-center">
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
              className="w-[150px] border bg-accent-500 rounded-md text-white mt-3 text-md p-2 text-center font-semibold"
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
  );
};
export default Profile;
