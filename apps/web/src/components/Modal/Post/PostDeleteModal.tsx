const PostDeleteModal = ({ onClick, onClose }: ModalProps & { onClick?: () => void }) => {
  const handleClick = () => {
    onClick();
    onClose();
  };
  return (
    <div className="w-full h-full md:w-[300px] md:h-[90px] flex flex-col items-center" role="document" tabIndex={-1}>
      글을 삭제하겠습니까?
      <div className="flex gap-7 mt-3">
        <button className="px-6 py-2 border border-slate-200 rounded-md font-light text-slate-400" onClick={onClose}>
          취소
        </button>
        <button className="px-6 py-2 text-white hover_bg rounded-md" onClick={handleClick}>
          삭제
        </button>
      </div>
    </div>
  );
};
export default PostDeleteModal;
