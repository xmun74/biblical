import { useEffect, useRef, useState } from 'react';

const PostUpdateModal = ({
  onClose,
  onSubmit,
  meetId,
  preTitle,
  preContent,
}: ModalProps<PostFormProps> & {
  meetId?: string;
  preTitle?: string;
  preContent?: string;
}) => {
  const [post, setPost] = useState<PostFormProps>({
    meetId,
    title: preTitle,
    content: preContent,
  });
  const [errMsg, setErrMsg] = useState(false);
  const titleInputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    titleInputRef.current.focus();
  }, []);

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
      <label className="flex justify-center font-bold mb-4">글 수정</label>
      <form className="flex flex-col" onSubmit={handleSubmit}>
        <input
          ref={titleInputRef}
          type="text"
          name="title"
          defaultValue={preTitle}
          className="h-[40px] text-2xl font-bold placeholder:text-2xl placeholder:font-bold focus:outline focus:outline-accent-400 rounded-sm mb-4"
          onChange={handleChangePostForm}
        />
        <textarea
          name="content"
          defaultValue={preContent}
          className="sign_input resize-none min-h-[250px]"
          onChange={handleChangePostForm}
        />
        <div className="text-red-400 text-xs h-[16px] mt-2">{errMsg && '입력창이 비어있습니다.'}</div>
        <div className="flex justify-end">
          <button type="submit" className="hover_bg font-bold text-white rounded-md px-7 py-2">
            수정
          </button>
        </div>
      </form>
    </div>
  );
};

export default PostUpdateModal;
