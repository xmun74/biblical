import Layout from '@/components/Layout';

const MeetingMember = () => {
  // 모임 멤버 api GET
  const MemberData = {
    meetId: 1,
    members: [
      {
        memberId: 1,
        memberImg: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
        memberNickname: '원피스',
        isFollow: false,
      },
      {
        memberId: 2,
        memberImg: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
        memberNickname: '루피',
        isFollow: false,
      },
    ],
  };

  return (
    <Layout>
      <div className="text-xl font-bold mb-8">{MemberData.members.length} Members</div>
      {MemberData &&
        MemberData.members.map(member => (
          <div className="flex items-center mb-6" key={member.memberId}>
            <img src={member.memberImg} alt="멤버 이미지" width={50} height={50} className="rounded-full mr-4" />
            <div className="flex-1 font-semibold text-sm">{member.memberNickname}</div>
            <button>{`팔로우`}</button>
          </div>
        ))}
    </Layout>
  );
};
export default MeetingMember;
