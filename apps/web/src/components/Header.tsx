import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import User from '@/interfaces/user';
import { getMeAPI, logoutAPI } from '@/lib/api';

const Header = () => {
  const queryClient = useQueryClient();
  const { data: userInfo } = useQuery<User>(['userInfo'], getMeAPI, {
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });

  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleMenuClick = () => {
    setIsModalOpen(!isModalOpen);
  };
  const handleLogout = async () => {
    try {
      const data = await logoutAPI();
      if (data?.message === 'SUCCESS') {
        // console.log('로그아웃', data);
        queryClient.removeQueries(['userInfo']); //userInfo
        setIsModalOpen(false);
        navigate('/');
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <header className="flex justify-between items-center sticky top-0 z-20 h-[80px] px-[40px] bg-white/50 backdrop-blur lg:mx-auto lg:max-w-[1256px]">
      <div className="flex text-xl">
        <Link to="/" className="font-monda mr-10">
          Biblical
        </Link>
        <Link
          to="/bible"
          className={`font-extrabold mr-6 hover:text-accent-350 ${pathname === '/bible' && 'text-accent-350'}`}
        >
          성경읽기
        </Link>
        <Link
          to="/meetings"
          className={`font-extrabold hover:text-accent-300 ${pathname === '/meetings' && 'text-accent-350'}`}
        >
          모임
        </Link>
      </div>
      {userInfo && userInfo?.id ? (
        <div className="relative flex items-center">
          <Link to={`/users/:userId/history`} className="font-bold text-accent-400 mr-4">
            MY 성경기록
          </Link>
          <div className="bg-slate-500 w-9 h-9 border rounded-3xl cursor-pointer" onClick={handleMenuClick}></div>
          {isModalOpen && (
            <div className="w-[184px] absolute right-0 z-20 top-[40px] p-2 rounded shadow-lg border">
              <Link to={`/users/${userInfo?.id}`} className="block px-4 py-2 hover:bg-slate-50">
                내 정보 수정
              </Link>
              <div className="px-4 py-2 hover:bg-slate-50 cursor-pointer" onClick={handleLogout}>
                로그아웃
              </div>
            </div>
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
