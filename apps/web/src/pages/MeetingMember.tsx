import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getMeAPI, getMeetingMembersAPI } from '@/apis';
import AvatarImg from '@/components/common/AvatarImg';
import FollowBtn from '@/components/common/FollowBtn';
import { QUERY_KEYS } from '@/constants';

const MeetingMember = () => {
  const { meetId } = useParams();
  const navigate = useNavigate();
  const [isFollowers, setIsFollowers] = useState(0);
  const { data: me } = useQuery<User>([QUERY_KEYS.MY_INFO], getMeAPI);
  const { data: memberRes } = useQuery<{ id: number; Member: Member[] }>(
    [QUERY_KEYS.MEETING_MEMBER, Number(meetId)],
    () => getMeetingMembersAPI(Number(meetId))
  );

  return (
    <main>
      <div className="text-xl font-bold mb-8">{memberRes?.Member?.length} Members</div>
      {memberRes &&
        memberRes?.Member?.map(member => (
          <div className="flex items-center mb-6" key={member.id}>
            <AvatarImg src={member.img} size="sm" rounded="full" onClick={() => navigate(`/users/${member.id}`)} />
            <div
              onClick={() => navigate(`/users/${member.id}`)}
              className="flex-1 font-semibold text-sm ml-4 cursor-pointer"
            >
              {member.nickname}
            </div>
            {me?.id !== member?.id && (
              <FollowBtn otherUserId={member.id} isFollowers={isFollowers} setIsFollowers={setIsFollowers} />
            )}
          </div>
        ))}
    </main>
  );
};
export default MeetingMember;
