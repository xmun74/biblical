import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import AvatarImg from './AvatarImg';
import { getMeAPI, logoutAPI } from '@/apis';
import MenuBar from '@/assets/svg/MenuBar.svg';
import MenuClose from '@/assets/svg/MenuClose.svg';
import { QUERY_KEYS } from '@/constants';
import { getLocalStorage, removeLocalStorage } from '@/utils/localStorage';

const Header = () => {
  const queryClient = useQueryClient();
  const loggedIn: boolean = getLocalStorage('isLoggedIn');
  const { data: userInfo } = useQuery<User>([QUERY_KEYS.MY_INFO], getMeAPI, {
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    retry: 2,
    enabled: Boolean(loggedIn), // 로그인했을 때만 fetch
  });
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isOpenMenu, setIsOpenMenu] = useState(false);

  const onMenuItemClick = () => {
    setIsModalOpen(false);
  };

  const handleLogout = async () => {
    try {
      const data = await logoutAPI();
      if (data?.message === 'SUCCESS') {
        queryClient.clear();
        removeLocalStorage('isLoggedIn');
        setIsModalOpen(false);
        setIsOpenMenu(false);
        navigate('/');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleOpenMenuBar = () => {
    setIsOpenMenu(!isOpenMenu);
  };
  const baseMenu = [
    { title: '성경읽기', href: '/bible' },
    { title: '모임', href: '/meetings' },
  ];

  return (
    <>
      <header
        className={`flex justify-between items-center sticky top-0 z-10 w-full h-[70px] md:h-[80px] ${
          pathname === '/' && 'text-accent-400'
        } backdrop-blur-xl px-4 sm:px-[40px] mx-auto lg:max-w-[1200px]`}
      >
        <div className="flex text-xl">
          <Link to="/" className={`font-monda mr-10 md:w-[75px] h-[28px]`}>
            Biblical
          </Link>
          <Link
            to="/bible"
            className={`hidden md:flex font-extrabold mr-6 hover:text-accent-350 w-[70px] ${
              pathname === '/bible' && 'text-accent-350'
            }`}
          >
            성경읽기
          </Link>
          <Link
            to="/meetings"
            className={`hidden md:flex font-extrabold hover:text-accent-300 w-[70px] ${
              pathname === '/meetings' && 'text-accent-350'
            }`}
          >
            모임
          </Link>
        </div>

        {userInfo && userInfo?.id ? (
          <div className="hidden md:flex relative items-center h-full">
            {/*  <Link to={`/users/${userInfo.id}/history`} className="font-bold text-accent-400 mr-2 w-[85px]">
              MY 성경기록
            </Link> */}

            <div
              className="flex items-center pl-4 h-full cursor-pointer w-[52px]"
              onMouseEnter={() => setIsModalOpen(true)}
              onMouseLeave={() => setIsModalOpen(false)}
            >
              <AvatarImg
                src={userInfo?.img}
                size="sm"
                rounded="full"
                onClick={() => navigate(`/users/${userInfo?.id}`)}
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
          <div className={`hidden md:inline text-sm  ${pathname === '/' ? 'text-accent-500/60' : 'text-slate-600'} `}>
            <Link to="/auth/login" className="border-r border-slate-200 pr-2 mr-2">
              로그인
            </Link>
            <Link to="/auth/signup">회원가입</Link>
          </div>
        )}
        {/* 모바일 */}
        <div className="block md:hidden">
          <button className={`p-2 ${isOpenMenu ? 'hidden' : 'block'}`} onClick={handleOpenMenuBar}>
            <MenuBar
              fill={`${pathname === '/' ? 'rgba(20, 247, 117, 1)' : 'black'}`}
              width={28}
              height={28}
              stroke={`${pathname === '/' ? 'rgba(20, 247, 117, 1)' : 'black'}`}
            />
          </button>
        </div>
      </header>

      {/* 모바일 메뉴 활성화 시 */}
      <div
        className={`${isOpenMenu && 'fixed left-0 top-0 w-full h-full bg-neutral-700/[0.6] z-10'}`}
        onClick={() => setIsOpenMenu(false)}
      />
      <div
        className={`bg-white fixed p-5 top-0 right-0 h-full w-48 z-10  transition-all	${
          isOpenMenu ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <button
          className={`absolute top-2 p-1 bg-transparent border-none -left-12 ${isOpenMenu ? 'block' : 'hidden'}`}
          onClick={handleOpenMenuBar}
        >
          <MenuClose fill="white" width={33} height={33} />
        </button>

        <div onClick={() => setIsOpenMenu(false)}>
          <Link to="/" className="font-monda text-2xl">
            Biblical
          </Link>
        </div>
        {userInfo && userInfo?.id ? (
          <div onClick={() => setIsOpenMenu(false)}>
            <Link to={`/users/${userInfo?.id}`} className="flex items-center pt-4 pb-4 mb-4 border-b text-sm">
              <AvatarImg
                src={userInfo?.img}
                size="xs"
                rounded="full"
                onClick={() => navigate(`/users/${userInfo?.id}`)}
              />
              <span className="ml-2">{userInfo?.nickname}</span>
            </Link>
          </div>
        ) : (
          <div className="text-sm text-slate-600  pt-4 pb-4 mb-4 border-b">
            <Link to="/auth/login" className="border-r border-slate-200 pr-2 mr-2">
              로그인
            </Link>
            <Link to="/auth/signup">회원가입</Link>
          </div>
        )}

        {baseMenu?.map(menu => (
          <div key={menu.title} onClick={() => setIsOpenMenu(false)}>
            <Link to={menu.href} className="flex items-center text-sm font-light h-[40px] hover:font-normal">
              {menu.title}
            </Link>
          </div>
        ))}

        {userInfo && userInfo?.id && (
          <>
            <div onClick={() => setIsOpenMenu(false)}>
              <Link
                to={`/users/${userInfo?.id}`}
                className="flex items-center text-sm font-light h-[40px] hover:font-normal"
              >
                마이페이지
              </Link>
            </div>
            <button className="flex items-center text-sm font-light h-[40px] hover:font-normal" onClick={handleLogout}>
              로그아웃
            </button>
          </>
        )}
      </div>
    </>
  );
};
export default Header;
