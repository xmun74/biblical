import { useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import Layout from './Layout';
import Back from '@/assets/svg/Back.svg';

const MeetingNav = () => {
  const { meetId } = useParams();
  const { pathname } = useLocation();
  const [navName, setNavName] = useState([
    {
      name: '멤버',
      href: `/meetings/${meetId}/member`,
    },
    {
      name: '게시글',
      href: `/meetings/${meetId}/posts`,
    },
  ]);

  // test용
  const MeetingData = {
    meetId: 1,
    name: '유치원부 교사',
    members: ['하동훈', '유재석', '박명수', '정준하'],
    posts: [
      { postId: 2, title: '성경학교 공지', content: '내용입니다.', createdAt: '2023.09.08', author: '정준하' },
      { postId: 2, title: '티셔츠 사전조사', content: '내용2입니다.', createdAt: '2023.06.08', author: '명수' },
    ],
  };
  useEffect(() => {
    const fetchApi = () => {
      setNavName([
        {
          name: MeetingData.name, // 모임 API GET
          href: `/meetings/${meetId}`,
        },
        ...navName,
      ]);
    };
    fetchApi();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Layout>
      <Link to={`/meetings`} className="flex w-[120px] items-center text-slate-500/[0.6]">
        <Back width={16} height={16} fill="rgb(100 116 139)" />
        <div className="pl-2 hover:text-slate-500">내 모임 목록</div>
      </Link>

      <nav className="flex my-2 sm:my-6 justify-between items-center border-b border-slate-200">
        <div className="flex md:text-xl font-semibold">
          {navName &&
            navName?.map(nav => (
              <Link
                key={nav.name}
                to={nav.href}
                className={`px-3 sm:px-4 py-3 hover:text-orange-400 ${
                  pathname === nav.href && 'text-orange-400 font-extrabold border-b-2 border-b-orange-400'
                }`}
              >
                {nav?.name}
              </Link>
            ))}
        </div>
        <button className="text-sm min-w-[40px] sm:w-[70px] h-[35px] rounded-md text-white font-bold hover_bg">
          초대
        </button>
      </nav>
    </Layout>
  );
};
export default MeetingNav;
