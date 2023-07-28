import { useQuery } from '@tanstack/react-query';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import User from '@/interfaces/user';
import { getMeAPI, getUserAPI } from '@/lib/api';
import { PAGE_ROUTES } from '@/lib/constants';

const Profile = () => {
  const navigate = useNavigate();
  const { userId } = useParams();
  const [avatar, setAvatar] = useState(
    'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
  );

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
  const isMeId = isMe();
  const { data: otherInfoData } = useQuery<User>(['otherUserInfo'], () => getUserAPI(Number(userId)), {
    enabled: Boolean(!isMeId),
  });

  useEffect(() => {
    if (isMe()) {
      if (MyInfoData?.img) {
        setAvatar(`${process.env.API_URL}${MyInfoData?.img}`);
      }
    } else {
      if (otherInfoData?.img) {
        setAvatar(`${process.env.API_URL}${otherInfoData?.img}`);
      }
    }
  }, [MyInfoData?.img, isMe, otherInfoData?.img]);

  return (
    <div className="md:grid grid-cols-3 gap-2 h-auto px-[40px] lg:mx-auto lg:max-w-[1256px]">
      {/* 왼쪽 */}
      <div className="rounded-3xl mr-4 shadow-lg top-20 h-fit px-4 py-10 border-b-2 mb-20 md:sticky flex flex-col justify-center items-center">
        <img
          className="justify-center bg-slate-100 w-[125px] h-[125px] rounded-[42px] object-cover mb-6"
          src={avatar}
          alt="profile image"
        />
        <div className="font-bold text-2xl text-center mb-2">
          {isMe() ? MyInfoData?.nickname : otherInfoData?.nickname}
        </div>

        <div className="flex items-center text-sm justify-center">
          <div className="text-slate-400 border-r-0 font-light">팔로워 &nbsp;</div>
          <div className="font-semibold text-slate-600">
            {isMe() ? MyInfoData?.Followers.length : otherInfoData?.Followers.length} &nbsp;
          </div>
          <div className="text-slate-400 border-r-0 font-light">팔로잉 &nbsp;</div>
          <div className="font-semibold text-slate-600">
            {isMe() ? MyInfoData?.Followings.length : otherInfoData?.Followings.length}
          </div>
        </div>
        {/* me */}
        {Number(userId) === MyInfoData?.id ? (
          <button
            type="submit"
            className="bg-accent-400 rounded-md text-white text-md p-2 max-w-[100px] text-center font-semibold mt-4"
            onClick={() => navigate(PAGE_ROUTES.PROFILE_EDIT)}
          >
            정보 수정
          </button>
        ) : null}
      </div>
      {/* 오른쪽 */}
      <div className="rounded-3xl col-span-2 h-auto shadow-lg p-4 ml-20"></div>
    </div>
  );
};
export default Profile;
