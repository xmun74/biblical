const MeetingCreateDoneModal = ({ onClose }: { onClose?: () => void }) => {
  const onClick = () => {
    window.history.pushState('', '', `/meetings`);
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
        // onClick={() => navigate(`/`)} // <Router> component안에 있는 게 아니라서 router-dom 안됨 에러남
        onClick={onClick}
      >
        <span className="font-bold">생성된 모임으로 이동하기</span>
        <div className="bg-white w-10 h-10 rounded-full flex justify-center items-center text-white">
          <svg width="32" height="33" viewBox="0 0 32 33" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M15.8043 25.3507L24.9423 16.5821M24.9423 16.5821L16.1737 7.44422M24.9423 16.5821L7.03581 16.2128"
              stroke="#2EE683"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </button>
    </div>
  );
};
export default MeetingCreateDoneModal;
