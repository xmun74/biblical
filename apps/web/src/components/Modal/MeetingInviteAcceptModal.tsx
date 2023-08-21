import { useQuery } from '@tanstack/react-query';
import { getMeetingsAPI } from '@/lib/api';
import { getLocalStorage } from '@/utils/localStorage';

const MeetingInviteAcceptModal = ({
  onSubmit,
  onClose,
  meetId,
}: {
  onSubmit?: () => void;
  onClose?: () => void;
  meetId?: string;
}) => {
  const loggedIn: boolean = getLocalStorage('isLoggedIn');
  const { data: myMeetings } = useQuery<{ meetings: MeetingsProps[] }>(['myMeetings'], getMeetingsAPI, {
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    enabled: Boolean(loggedIn),
  });
  const alreadySigned = myMeetings?.meetings?.filter(el => el.MeetingUser?.MeetingId === Number(meetId));

  const handleAcceptClick = () => {
    onSubmit();
    onClose();
  };
  return (
    <div
      className="w-full h-full md:w-[400px] md:h-[90px] flex flex-col justify-center items-center"
      role="document"
      tabIndex={-1}
    >
      {alreadySigned?.length > 0 ? (
        <>
          이미 가입한 모임입니다!
          <button
            type="button"
            className="bg-accent-400 rounded-md hover_bg flex justify-center items-center p-2 ml-2 mt-6 text-white font-bold"
            onClick={() => onClose()}
          >
            닫기
          </button>
        </>
      ) : (
        <>
          모임 초대에 수락하시겠습니까?
          <button
            type="button"
            className="bg-accent-400 rounded-md hover_bg flex justify-center items-center p-2 ml-2 mt-6 text-white font-bold"
            onClick={handleAcceptClick}
          >
            초대 수락하기
          </button>
        </>
      )}
    </div>
  );
};
export default MeetingInviteAcceptModal;
