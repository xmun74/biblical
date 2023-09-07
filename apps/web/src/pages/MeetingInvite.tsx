import { useModals } from '@biblical/react-ui';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { postMeetingInviteAPI } from '@/apis';
import { modals } from '@/components/Modal/modals';
import { useMyInfo } from '@/utils/react-query';

const MeetingInvite = () => {
  const { meetId, inviteLink } = useParams();
  const path = useLocation();
  const navigate = useNavigate();
  const { data: me } = useMyInfo();
  const { openModal } = useModals();

  const handleClick = async () => {
    if (me?.id) {
      openModal(modals.meetInviteAcceptModal, {
        onSubmit: async () => {
          const data = await postMeetingInviteAPI(Number(meetId), inviteLink);
          console.log('모임 가입 :', data);
          navigate(`/meetings/${meetId}`);
        },
        meetId,
        inviteLink,
      });
    } else {
      navigate('/auth/login', { state: path });
    }
  };
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
      당신을 모임으로 초대했습니다.
      <br />
      초대장을 확인하시겠습니까?
      <button onClick={handleClick} className="mt-10 hover_bg p-2 text-white rounded-md font-bold">
        초대장 확인
      </button>
    </div>
  );
};
export default MeetingInvite;
