import { useNavigate, useParams } from 'react-router-dom';
import { postMeetingInviteAPI } from '@/lib/api';
import { useMyInfo } from '@/utils/react-query';

const MeetingInvite = () => {
  const { meetId, inviteLink } = useParams();
  const navigate = useNavigate();
  const { data: me } = useMyInfo();
  const handleClick = async () => {
    if (me?.id) {
      const data = await postMeetingInviteAPI(Number(meetId), inviteLink);
      console.log('모임 가입 :', data);
    } else {
      navigate('/auth/login');
    }
  };
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
      당신을 모임으로 초대합니다.
      <button onClick={handleClick} className="mt-10 hover_bg p-2 text-white rounded-md font-bold">
        초대장 확인
      </button>
    </div>
  );
};
export default MeetingInvite;
