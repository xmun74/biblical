import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import User from '@/interfaces/user';
import { deleteUserAPI, getMeAPI, patchNicknameAPI, patchUserImgAPI } from '@/lib/api';

const ProfileEdit = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [email, setEmail] = useState('');
  const [nickname, setNickname] = useState('');
  const [imgFile, setImgFile] = useState<File>();
  const [avatar, setAvatar] = useState(
    'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
  );
  const [nickErrMsg, setNickErrMsg] = useState('');
  const [imgerrMsg, setImgErrMsg] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const NickInputRef = useRef<HTMLInputElement>(null);

  const { data: userInfoData } = useQuery<User>(['userInfo'], getMeAPI);

  const { mutate: nickMutation } = useMutation<User, AxiosError, string>(['userInfo'], patchNicknameAPI, {
    onError: (error: AxiosError) => {
      setNickErrMsg(`${error.response?.data}`);
      NickInputRef.current.focus();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userInfo'] });
    },
  });

  const { mutate: imgMutation, data: imgRes } = useMutation(['userInfo'], patchUserImgAPI, {
    onError: (error: unknown) => {
      if (error instanceof AxiosError) {
        if (error?.response?.data === 'File too large') {
          setImgErrMsg(`용량이 5MB 이하여야 합니다.`);
        }
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userInfo'] });
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

  const handleUserInfoEdit = async () => {
    const formData = new FormData();
    formData.append(process.env.USER_IMG_FIELD, imgFile);
    try {
      nickMutation(nickname);
      imgMutation(formData);
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
    <div className="py-14 px-10 md:py-12 md:mx-auto lg:max-w-[1256px]">
      <div className="flex justify-between mb-14">
        <div className="font-bold text-2xl">내 정보 수정</div>
        <button className="text-red-400" onClick={handleUserDelete}>
          회원탈퇴
        </button>
      </div>

      <div className="flex">
        <img
          className="bg-slate-200 w-[125px] h-[125px] rounded-[42px] mr-[40px] object-cover cursor-pointer hover:opacity-70"
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

        <div>
          <div className="font-bold text-slate-400 text-sm">이메일 주소</div>
          <div>{email && email}</div>
          <div className="font-bold text-slate-400 text-sm mt-2">닉네임</div>
          <input
            ref={NickInputRef}
            type="text"
            className="sign_input"
            defaultValue={nickname}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNickname(e.target.value)}
          />
          <div className="text-red-400 text-xs">{nickErrMsg}</div>
        </div>
      </div>
      <div className="text-red-400 text-xs">{imgerrMsg}</div>
      <button
        type="submit"
        className="bg-accent-400 rounded-md text-white text-lg p-2 max-w-[100px] text-center font-semibold ml-[165px] mt-4"
        onClick={handleUserInfoEdit}
      >
        정보 수정
      </button>
    </div>
  );
};
export default ProfileEdit;
