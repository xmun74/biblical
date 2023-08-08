const MeetingCreateModal = ({ onSubmit, onClose }: { onSubmit?: (value: string) => void; onClose?: () => void }) => {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (typeof onSubmit === 'function') {
      await onSubmit('모달에서 입력한 값이다');
      onClose();
    }
  };
  const handleClickCancel = () => {
    onClose();
  };

  return (
    <div className="w-full h-full md:w-[500px] md:h-[300px] block" role="document" tabIndex={-1}>
      <label className="font-bold text-lg" id="title-dialog">
        모임생성
      </label>
      <form className="flex flex-col" onSubmit={handleSubmit}>
        <input placeholder="모임명을 작성해보세요." />
        <button type="submit">모임 생성</button>
        <div>
          <button type="submit">확인</button>
          <button onClick={handleClickCancel}>취소</button>
        </div>
      </form>
    </div>
  );
};
export default MeetingCreateModal;
