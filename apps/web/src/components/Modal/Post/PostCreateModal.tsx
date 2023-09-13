import { useState } from 'react';

const PostCreateModal = ({
  onClose,
  onSubmit,
  meetId,
}: ModalProps<PostFormProps> & {
  meetId?: string;
}) => {
  const [post, setPost] = useState<PostFormProps>({
    meetId,
    title: '',
    content: '',
  });
  const [errMsg, setErrMsg] = useState(false);

  const handleChangePostForm = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setErrMsg(false);
    setPost({
      ...post,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (post.title.length <= 0 || post.content.length <= 0) {
      setErrMsg(true);
      return;
    }
    if (typeof onSubmit === 'function') {
      onSubmit(post);
      onClose();
    }
  };
  return (
    <div className="w-full h-full md:w-[600px] md:h-[420px] block" role="document" tabIndex={-1}>
      <form className="flex flex-col" onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="글 제목을 작성해주세요."
          className="h-[40px] text-2xl font-bold placeholder:text-2xl placeholder:font-bold focus:outline focus:outline-accent-400 rounded-sm mb-4"
          onChange={handleChangePostForm}
        />
        <textarea
          name="content"
          placeholder="어떤 내용을 나누고 싶나요?"
          className="sign_input resize-none min-h-[250px]"
          onChange={handleChangePostForm}
        />
        <div className="text-red-400 text-xs h-[16px] mt-2">{errMsg && '입력창이 비어있습니다.'}</div>
        <div className="flex justify-end">
          <button type="submit" className="hover_bg font-bold text-white rounded-md px-7 py-2">
            게시
          </button>
        </div>
      </form>
      <input />
    </div>
  );
};
export default PostCreateModal;
