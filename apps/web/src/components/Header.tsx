import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import User from '@/interfaces/user';
import { getMeAPI, logoutAPI } from '@/lib/api';
import { getLocalStorage, removeLocalStorage } from '@/utils/localStorage';

const Header = () => {
  const queryClient = useQueryClient();
  const loggedIn: boolean = getLocalStorage('isLoggedIn');

  const { data: userInfo } = useQuery<User>(['userInfo', loggedIn], getMeAPI, {
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    retry: 2,
    enabled: Boolean(loggedIn), // 로그인했을 때만 fetch
  });
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [avatar, setAvatar] = useState(
    'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
  );

  useEffect(() => {
    if (userInfo?.img) {
      setAvatar(`${process.env.API_URL}${userInfo?.img}`);
    }
  }, [userInfo?.img]);

  const onMenuItemClick = () => {
    setIsModalOpen(false);
  };

  const handleLogout = async () => {
    try {
      const data = await logoutAPI();
      if (data?.message === 'SUCCESS') {
        // console.log('로그아웃', data);
        queryClient.removeQueries(['userInfo']);
        queryClient.invalidateQueries(['userInfo']);
        removeLocalStorage('isLoggedIn');
        setIsModalOpen(false);
        navigate('/');
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <header className="flex justify-between items-center sticky top-0 z-10 h-[80px] bg-white/50 backdrop-blur px-[40px] lg:mx-auto lg:max-w-[1200px]">
      <div className="flex text-xl">
        <Link to="/" className="font-monda mr-10 w-[75px] h-[28px]">
          Biblical
        </Link>
        <Link
          to="/bible"
          className={`font-extrabold mr-6 hover:text-accent-350 w-[70px] ${pathname === '/bible' && 'text-accent-350'}`}
        >
          성경읽기
        </Link>
        <Link
          to="/meetings"
          className={`font-extrabold hover:text-accent-300 w-[70px] ${pathname === '/meetings' && 'text-accent-350'}`}
        >
          모임
        </Link>
      </div>
      {userInfo && userInfo?.id ? (
        <div className="relative flex items-center h-full">
          <Link to={`/users/${userInfo.id}/history`} className="font-bold text-accent-400 mr-2 w-[85px]">
            MY 성경기록
          </Link>

          <div
            className="flex items-center pl-4 h-full cursor-pointer w-[52px]"
            onMouseEnter={() => setIsModalOpen(true)}
            onMouseLeave={() => setIsModalOpen(false)}
          >
            <img
              src={avatar}
              alt="user avatar image"
              className="w-9 h-9 border rounded-3xl cursor-pointer object-cover"
              onClick={() => navigate(`/users/${userInfo.id}`)}
            />
          </div>
          {isModalOpen && (
            <section
              className="w-[184px] absolute right-[-5px] top-[75px] p-2 bg-white rounded shadow-lg border"
              onMouseEnter={() => setIsModalOpen(true)}
              onMouseLeave={() => setIsModalOpen(false)}
            >
              <div className="inline-block absolute right-3 top-[-11px] w-[20px] h-[20px] transform rotate-45 border bg-white border-solid border-r-0 border-b-0" />
              <Link
                to={`/users/${userInfo?.id}`}
                className="inline-block px-4 py-2 font-semibold hover:font-extrabold"
                onClick={onMenuItemClick}
              >
                {userInfo.nickname}
              </Link>
              <Link
                to={`/user/edit`}
                className="block px-4 py-2 hover:bg-slate-50 cursor-pointer"
                onClick={onMenuItemClick}
              >
                내 정보 수정
              </Link>
              <div className="px-4 py-2 hover:bg-slate-50 cursor-pointer" onClick={handleLogout}>
                로그아웃
              </div>
            </section>
          )}
        </div>
      ) : (
        <div className="text-sm text-slate-600">
          <Link to="/auth/login" className="border-r border-slate-200 pr-2 mr-2">
            로그인
          </Link>
          <Link to="/auth/signup">회원가입</Link>
        </div>
      )}
    </header>
  );
};
export default Header;
