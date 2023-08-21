/* eslint-disable react-hooks/exhaustive-deps */
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AvatarImg from '@/components/AvatarImg';
import FollowBtn from '@/components/FollowBtn';
import Layout from '@/components/Layout';
import { getMeAPI, getMeetingMembersAPI } from '@/lib/api';
import User from '@/types/user';

const MeetingMember = () => {
  const { meetId } = useParams();
  const navigate = useNavigate();
  const [members, setMembers] = useState<MemberProps[]>([]);
  const [isFollowers, setIsFollowers] = useState(0);
  const { data: me } = useQuery<User>(['userInfo'], getMeAPI);

  useEffect(() => {
    const fetchMembers = async () => {
      const { Members } = await getMeetingMembersAPI(Number(meetId));
      setMembers(Members);
      // console.log('멤버 :', Members);
    };
    fetchMembers();
  }, []);

  return (
    <Layout>
      <div className="text-xl font-bold mb-8">{members.length} Members</div>
      {members &&
        members?.map(member => (
          <div className="flex items-center mb-6" key={member.id}>
            <AvatarImg src={member.img} userId={member.id} width={50} height={50} />
            <div
              onClick={() => navigate(`/users/${member.id}`)}
              className="flex-1 font-semibold text-sm ml-4 cursor-pointer"
            >
              {member.nickname}
            </div>
            {/* 나는 팔로우버튼 없애기 */}
            {me?.id !== member?.id && (
              <FollowBtn otherUserId={member.id} isFollowers={isFollowers} setIsFollowers={setIsFollowers} />
            )}
          </div>
        ))}
    </Layout>
  );
};
export default MeetingMember;
