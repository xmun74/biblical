import { useQuery } from '@tanstack/react-query';
import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { axiosInstance } from '@/config/axiosConfig';
import { deleteUser, getUser, patchUser } from '@/lib/api';

const Profile = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [nickname, setNickname] = useState('');
  const [imgFile, setImgFile] = useState<File>();
  const [avatar, setAvatar] = useState(
    'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
  );
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { userId } = useParams();
  const { data } = useQuery(['userInfo'], () => getUser(Number(userId)));
  console.log('프로필조회', data);

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const { data } = await axiosInstance.get(`users/${userId}`);
        console.log('내정보조회', data);
        setEmail(data?.email);
        setNickname(data?.nickname);
      } catch (error) {
        console.error(error);
      }
    };

    getUserInfo();
  }, [userId]);

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
        formData.append('file', uploadFiles);
      }
      setImgFile(uploadFiles);
    }
  };

  const handleUserInfoEdit = async () => {
    const formData = new FormData();
    formData.append('file', imgFile);
    try {
      await patchUser(Number(userId), nickname);
    } catch (err) {
      console.log(err);
    }
  };

  const handleUserDelete = async () => {
    try {
      const res = await deleteUser(Number(userId));
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
          className="bg-slate-200  w-[125px] h-[125px] rounded-3xl mr-[40px] object-cover cursor-pointer hover:opacity-70"
          src={avatar}
          alt="profile image"
          onClick={() => fileInputRef.current?.click()}
        />
        <input
          className="hidden bg-cover"
          type="file"
          name="profile_img"
          accept="image/jpg,impge/png,image/jpeg"
          ref={fileInputRef}
          onChange={handelImgChange}
        />

        <div>
          <div className="font-bold text-slate-400 text-sm">이메일 주소</div>
          <div>{email && email}</div>
          <div className="font-bold text-slate-400 text-sm mt-2">닉네임</div>
          <input
            type="text"
            className="sign_input"
            defaultValue={nickname}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNickname(e.target.value)}
          />
        </div>
      </div>
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
export default Profile;