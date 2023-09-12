import { useQuery } from '@tanstack/react-query';
import { SetStateAction, useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { deleteUnFollowAPI, getMeAPI, postFollowAPI } from '@/apis';
import { QUERY_KEYS } from '@/constants';

const FollowBtn = ({
  otherUserId,
  isFollowers,
  setIsFollowers,
}: {
  otherUserId: number;
  isFollowers?: number;
  setIsFollowers?: React.Dispatch<SetStateAction<number>>;
}) => {
  const { userId } = useParams();
  const { data: me } = useQuery<User>([QUERY_KEYS.MY_INFO], getMeAPI, {
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
  const [isFollow, setIsFollow] = useState(false);

  useEffect(() => {
    let isFollowed;
    if (userId) {
      isFollowed = me?.Followings?.find(el => el.id === Number(userId));
    } else {
      isFollowed = me?.Followings?.find(el => el.id === otherUserId);
    }
    if (isFollowed) {
      setIsFollow(true);
    }
  }, [me?.Followings, otherUserId, userId]);

  const onClickBtn = useCallback(async () => {
    if (isFollow) {
      const res = await deleteUnFollowAPI(Number(otherUserId));
      if (res) {
        setIsFollow(false);
        setIsFollowers(isFollowers - 1);
      }
    } else {
      const res = await postFollowAPI(Number(otherUserId));
      if (res) {
        setIsFollow(true);
        setIsFollowers(isFollowers + 1);
      }
    }
  }, [isFollow, isFollowers, otherUserId, setIsFollowers]);

  return (
    <button
      className={`w-full max-w-[150px] border rounded-md p-2 font-bold transition-all 
      ${
        isFollow ? `border-slate-300 hover:bg-slate-50 text-slate-400` : `bg-accent-400 text-white hover:bg-accent-500`
      }`}
      onClick={onClickBtn}
    >
      {isFollow ? `✓ 팔로잉` : '팔로우'}
    </button>
  );
};
export default FollowBtn;
