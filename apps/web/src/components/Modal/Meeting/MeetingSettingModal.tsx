const MeetingSettingModal = ({ onClose, onClick }: ModalProps & { onClick?: () => void }) => {
  const handleWithDraw = async () => {
    onClick();
    onClose();
  };
  return (
    <div className="w-full h-full md:w-[300px] md:h-[220px] block" role="document" tabIndex={-1}>
      <div className="font-bold text-xl border-b pb-2 mb-2" id="title-dialog">
        모임 설정
      </div>
      <div className="py-2 flex justify-between text-sm">
        <div>모임 탈퇴</div>
        <button className="text-red-400" onClick={handleWithDraw}>
          탈퇴하기
        </button>
      </div>
    </div>
  );
};
export default MeetingSettingModal;
