const MeetingInviteModal = ({
  onSubmit,
  onClose,
  inviteUrl,
}: ModalProps<string> & {
  inviteUrl?: string;
}) => {
  const handleClick = () => {
    onSubmit(inviteUrl);
    onClose();
  };
  return (
    <div className="w-full h-full md:w-[600px] md:h-[120px] block" role="document" tabIndex={-1}>
      <label className="font-bold text-xl" id="name-dialog">
        모임 초대하기
      </label>
      <div className="flex w-full mt-4 items-center">
        <input readOnly value={inviteUrl} placeholder="초대링크" className="flex-1 sign_input text-sm text-slate-400" />
        <button
          type="button"
          className="bg-accent-400 rounded-md hover_bg flex justify-center items-center p-2 ml-2 text-white font-bold"
          onClick={handleClick}
        >
          링크 복사
        </button>
      </div>
    </div>
  );
};
export default MeetingInviteModal;
