import { useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import Layout from './Layout';
import Back from '@/assets/svg/Back.svg';
import { getMeetingAPI } from '@/lib/api';

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

  useEffect(() => {
    const fetchApi = async () => {
      const { meeting } = await getMeetingAPI(Number(meetId));
      console.log('모임조회 :', meeting);
      setNavName([
        {
          name: meeting?.name, // 모임 API GET
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
