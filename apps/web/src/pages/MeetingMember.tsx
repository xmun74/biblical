import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AvatarImg from '@/components/AvatarImg';
import FollowBtn from '@/components/FollowBtn';
import { getMeAPI, getMeetingMembersAPI } from '@/lib/api';
import { QUERY_KEYS } from '@/lib/constants';
import User from '@/types/user';

const MeetingMember = () => {
  const { meetId } = useParams();
  const navigate = useNavigate();
  const [members, setMembers] = useState<MemberProps[]>([]);
  const [isFollowers, setIsFollowers] = useState(0);
  const { data: me } = useQuery<User>([QUERY_KEYS.MY_INFO], getMeAPI);

  useEffect(() => {
    const fetchMembers = async () => {
      const { Members } = await getMeetingMembersAPI(Number(meetId));
      setMembers(Members);
    };
    fetchMembers();
  }, [meetId]);

  return (
    <main>
      <div className="text-xl font-bold mb-8">{members.length} Members</div>
      {members &&
        members?.map(member => (
          <div className="flex items-center mb-6" key={member.id}>
            <AvatarImg src={member.img} userId={member.id} size="sm" rounded="full" />
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
