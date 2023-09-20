import AvatarImg from '@/components/common/AvatarImg';

const PostReadModal = ({
  onAvatarClick,
  onClose,
  post,
}: ModalProps & {
  onAvatarClick?: () => void;
  post?: Post;
}) => {
  const handleAvatarClick = () => {
    onAvatarClick();
    onClose();
  };
  return (
    <div className="w-full h-fit px-4 md:max-w-[600px] md:min-h-[250px] block" role="document" tabIndex={-1}>
      <div className="flex">
        <AvatarImg src={post?.User?.img} size="sm" rounded="full" onClick={handleAvatarClick} />
        <div className="w-full flex flex-col justify-between ml-3">
          <div
            onClick={handleAvatarClick}
            className="w-fit font-bold cursor-pointer hover:text-accent-400 mb-1 transition-all text-xs"
          >
            {post?.User?.nickname}
          </div>
          <div className="text-slate-400 text-xs">{post.createdAt}</div>
          <div className="mt-4">
            <div className="font-semibold mb-2 text-2xl">{post.title}</div>
            <div className="">{post.content}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default PostReadModal;
