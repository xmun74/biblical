import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { deleteUserAPI, getMeAPI, patchNicknameAPI, patchUserImgAPI } from '@/apis';
import Layout from '@/components/common/Layout';
import { DEFAULT_IMG_URL, QUERY_KEYS } from '@/constants';

const ProfileEdit = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [email, setEmail] = useState('');
  const [nickname, setNickname] = useState('');
  const [imgFile, setImgFile] = useState<File>();
  const [avatar, setAvatar] = useState(DEFAULT_IMG_URL);
  const [nickErrMsg, setNickErrMsg] = useState('');
  const [imgerrMsg, setImgErrMsg] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const NickInputRef = useRef<HTMLInputElement>(null);

  const { data: userInfoData } = useQuery<User>([QUERY_KEYS.MY_INFO], getMeAPI);

  const { mutate: nickMutation } = useMutation<User, AxiosError, string>([QUERY_KEYS.MY_INFO], patchNicknameAPI, {
    onError: (error: AxiosError) => {
      setNickErrMsg(`${error.response?.data}`);
      NickInputRef.current.focus();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.MY_INFO] });
    },
  });

  const { mutate: imgMutation, data: imgRes } = useMutation<
    { fileName: string; userImgUrl: string },
    AxiosError,
    FormData
  >([QUERY_KEYS.MY_INFO], patchUserImgAPI, {
    onError: error => {
      if (error instanceof AxiosError) {
        if (error?.response?.data === 'File too large') {
          setImgErrMsg(`용량이 5MB 이하여야 합니다.`);
        }
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.MY_INFO] });
    },
  });

  useEffect(() => {
    setNickErrMsg('');
    setImgErrMsg('');
    setEmail(userInfoData?.email);
    setNickname(userInfoData?.nickname);
    if (userInfoData?.img) {
      setAvatar(`${process.env.API_URL}${userInfoData?.img}`);
    }
  }, [userInfoData]);

  const handelImgChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files?.[0] !== undefined) {
      const uploadFiles = e.target.files?.[0];
      /* 이미지 미리보기 */
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2 && typeof reader.result === 'string') {
          setAvatar(reader.result);
        }
      };
      reader.readAsDataURL(uploadFiles);

      /* 이미지 state 저장 */
      const formData = new FormData();
      if (uploadFiles) {
        formData.append(process.env.USER_IMG_FIELD, uploadFiles);
      }
      setImgFile(uploadFiles);
    }
  };

  const handleEdit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const imgFormData = new FormData();
    imgFormData.append(process.env.USER_IMG_FIELD, imgFile);
    try {
      nickMutation(nickname);
      if (imgFormData.get(process.env.USER_IMG_FIELD) !== 'undefined') {
        imgMutation(imgFormData);
      }
      if (imgRes?.userImgUrl) {
        setAvatar(`${process.env.API_URL}${imgRes?.userImgUrl}`);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleUserDelete = async () => {
    try {
      const res = await deleteUserAPI();
      if (res?.status === 200) {
        navigate('/');
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Layout>
      <div className="pt-10">
        <div className="flex justify-between mb-14 pb-4 border-b">
          <div className="font-bold text-xl md:text-2xl">내 정보 수정</div>
          <button className="text-red-400 underline" onClick={handleUserDelete}>
            회원탈퇴
          </button>
        </div>

        <form onSubmit={handleEdit} className="max-w-[650px]" encType="multipart/form-data" action="/upload">
          <div className="flex">
            <label className="font-bold text-slate-500 w-[250px]">
              프로필 사진
              <div className="text-slate-400 font-thin text-sm">확장자: png, jpg, jpeg / 용량: 5MB 이하</div>
            </label>
            <div>
              <img
                className="bg-slate-200 w-[125px] h-[125px] rounded-[42px] object-cover cursor-pointer hover:opacity-70 mb-2"
                src={avatar}
                alt="profile image"
                onClick={() => fileInputRef.current?.click()}
              />
              <input
                className="hidden bg-cover"
                type="file"
                name={`${process.env.USER_IMG_FIELD}`}
                accept="image/jpg,image/png,image/jpeg"
                ref={fileInputRef}
                onChange={handelImgChange}
              />
              <div className="text-red-400 h-[16px] text-xs">{imgerrMsg}</div>
            </div>
          </div>

          <div className="flex mt-8">
            <label className="font-bold text-slate-500 min-w-[250px]">이메일 주소</label>
            {email && email}
          </div>
          <div className="flex mt-8">
            <label className="font-bold text-slate-500 w-[250px]">
              닉네임
              <div className="text-slate-400 font-thin text-sm">2~15자</div>
            </label>
            <div>
              <input
                ref={NickInputRef}
                type="text"
                className="sign_input w-full sm:max-w-[400px]"
                defaultValue={nickname}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNickname(e.target.value)}
              />
              <div className="text-red-400 h-[16px] text-xs">{nickErrMsg}</div>
            </div>
          </div>
          <button
            type="submit"
            className="bg-accent-400 rounded-md text-white text-lg p-2 w-full text-center font-semibold mt-10"
          >
            정보 수정
          </button>
        </form>
      </div>
    </Layout>
  );
};
export default ProfileEdit;
