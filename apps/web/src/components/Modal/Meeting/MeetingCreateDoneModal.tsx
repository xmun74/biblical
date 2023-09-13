import ArrowRight from '@/assets/svg/ArrowRight.svg';

const MeetingCreateDoneModal = ({ onSubmit, onClose }: ModalProps) => {
  const handleClick = () => {
    onSubmit();
    onClose();
  };
  return (
    <div className="w-full h-full md:w-[300px]  block" role="document" tabIndex={-1}>
      <label className="font-bold text-xl" id="title-dialog">
        모임 만들기 완료!
      </label>
      <div className="text-sm text-slate-500 mt-4">팀원들을 초대해보세요!</div>
      <button
        type="button"
        className="bg-accent-400 w-full rounded-xl hover_bg flex justify-between p-3 mt-4 items-center text-white"
        onClick={handleClick}
      >
        <span className="font-bold">생성된 모임으로 이동하기</span>
        <div className="bg-white w-10 h-10 rounded-full flex justify-center items-center text-white">
          <ArrowRight stroke="#2EE683" width="32" height="32" strokeWidth="1.8" />
        </div>
      </button>
    </div>
  );
};
export default MeetingCreateDoneModal;
