import { useQuery } from '@tanstack/react-query';
import { getMeetingsAPI } from '@/lib/api';
import { getLocalStorage } from '@/utils/localStorage';

const MeetingInviteAcceptModal = ({ onSubmit, onClose }: { onSubmit?: () => void; onClose?: () => void }) => {
  const loggedIn: boolean = getLocalStorage('isLoggedIn');
  const { data: myMeetings } = useQuery<{ meetings: MeetingsProps[] }>(['myMeetings'], getMeetingsAPI, {
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    enabled: Boolean(loggedIn),
  });

  const handleClick = () => {
    onSubmit();
    onClose();
  };
  console.log('내모임조회냐', myMeetings);
  return (
    <div
      className="w-full h-full md:w-[400px] md:h-[90px] flex flex-col justify-center items-center"
      role="document"
      tabIndex={-1}
    >
      이미 가입된 모임입니다. or
      <button
        type="button"
        className="bg-accent-400 rounded-md hover_bg flex justify-center items-center p-2 ml-2 mt-2 text-white font-bold"
        onClick={handleClick}
      >
        초대 수락하기
      </button>
    </div>
  );
};
export default MeetingInviteAcceptModal;
