import { useEffect, useState } from 'react';
import { getMeetingInviteInfoAPI } from '@/apis';
import { getLocalStorage } from '@/utils/localStorage';
import { useMyMeetings } from '@/utils/react-query';

const MeetingInviteAcceptModal = ({
  onSubmit,
  onClose,
  meetId,
  inviteLink,
}: ModalProps & {
  meetId?: string;
  inviteLink?: string;
}) => {
  const loggedIn: boolean = getLocalStorage('isLoggedIn');
  const { data: myMeetings } = useMyMeetings();
  const [meetName, setMeetName] = useState<string>();

  useEffect(() => {
    const fetchMeetingInfo = async () => {
      const { meeting } = await getMeetingInviteInfoAPI(Number(meetId), inviteLink);
      setMeetName(meeting?.name);
    };
    fetchMeetingInfo();
  }, [inviteLink, meetId, loggedIn]);

  const alreadySigned = myMeetings && myMeetings?.meetings?.filter(el => el.MeetingUser?.MeetingId === Number(meetId));
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
      {alreadySigned && alreadySigned?.length > 0 ? (
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
          <p>
            <span className="font-extrabold inline">{meetName} </span>
            모임 초대에 수락하시겠습니까?
          </p>
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
