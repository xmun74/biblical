import { useState } from 'react';

export interface MeetProps {
  title: string;
  introduce: string;
}

const MeetingCreateModal = ({ onSubmit, onClose }: { onSubmit?: (value: MeetProps) => void; onClose?: () => void }) => {
  const [meet, setMeet] = useState<MeetProps>({
    title: '',
    introduce: '',
  });
  const [errMsg, setErrMsg] = useState(false);

  const onChangeMeet = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setErrMsg(false);
    setMeet({
      ...meet,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (meet.introduce.length <= 0 || meet.title.length <= 0) {
      setErrMsg(true);
      return;
    }
    if (typeof onSubmit === 'function') {
      onSubmit(meet);
      onClose();
    }
  };

  return (
    <div className="w-full h-full md:w-[500px] md:h-[330px] block" role="document" tabIndex={-1}>
      <label className="font-bold text-xl" id="title-dialog">
        모임생성
      </label>
      <form className="flex flex-col mt-6" onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="모임명을 간단하게 작성해보세요."
          className="h-[40px] text-2xl font-bold placeholder:text-2xl placeholder:font-bold focus:outline focus:outline-accent-400 rounded-sm mb-4"
          onChange={onChangeMeet}
        />
        <textarea
          name="introduce"
          placeholder="모임 소개말과 교회명 등을 입력해주세요."
          className="sign_input resize-none min-h-[100px]"
          onChange={onChangeMeet}
        />
        <div className="text-red-400 text-xs h-[16px] mt-2">{errMsg && '입력창이 비어있습니다.'}</div>
        <button type="submit" className="sign_form_submit_btn hover_bg font-bold">
          모임 생성
        </button>
      </form>
    </div>
  );
};
export default MeetingCreateModal;
