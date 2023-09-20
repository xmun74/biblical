import { useModals } from '@biblical/react-ui';
import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { modals } from '../Modal/modals';
import { deleteWithdrawAPI, getMeetingAPI, postMeetingInviteLinkAPI, uploadPostAPI } from '@/apis';
import Plus from '@/assets/svg/Plus.svg';
import Setting from '@/assets/svg/Setting.svg';

const MeetingNav = ({ children }: { children: React.ReactNode }) => {
  const { meetId } = useParams();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { openModal } = useModals();
  const [meetingInfo, setMeetingInfo] = useState({
    name: '',
    introduce: '',
  });
  const navName = [
    {
      name: '통독 기록',
      href: `/meetings/${meetId}`,
    },
    {
      name: '게시글',
      href: `/meetings/${meetId}/posts`,
    },
    {
      name: '멤버',
      href: `/meetings/${meetId}/member`,
    },
  ];

  useEffect(() => {
    const fetchApi = async () => {
      const { meeting } = await getMeetingAPI(Number(meetId));
      // console.log('모임조회 :', meeting);
      setMeetingInfo({
        ...meetingInfo,
        name: meeting?.name,
        introduce: meeting?.introduce,
      });
    };
    fetchApi();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleInviteClick = async () => {
    const { inviteLink } = await postMeetingInviteLinkAPI(Number(meetId));
    const inviteUrl = `${process.env.CLIENT_URL}/meetings/${Number(meetId)}/invite/${inviteLink}`;

    openModal(modals.meetInviteModal, {
      onSubmit: async (value: string) => {
        await navigator.clipboard.writeText(inviteUrl);
        alert('복사 성공'); // 임시
        console.log('링크 복사 :', value);
      },
      inviteUrl,
    });
  };

  const handleSetting = () => {
    openModal(modals.meetSettingModal, {
      onClick: async () => {
        const data = await deleteWithdrawAPI(Number(meetId));
        if (data?.code === 'SUCC') {
          navigate('/meetings');
        }
      },
    });
  };

  const handleCreatePost = () => {
    openModal(modals.postCreateModal, {
      onSubmit: async (value: PostFormProps) => {
        const data = await uploadPostAPI(value);
        console.log('글쓰기 제출', data);
      },
      meetId,
    });
  };

  return (
    <div className="my-0 mx-auto w-full lg:max-w-[1200px]">
      <>
        <div className="px-4 sm:px-[40px] lg:hidden mt-3 font-bold text-lg flex items-center">{meetingInfo.name}</div>

        <nav className="px-4 sm:px-0 sm:mx-[40px] sticky top-[70px] md:top-[80px] flex my-2 justify-between items-center border-b border-slate-200 bg-white/50 backdrop-blur border-t lg:border-t-0">
          <ul className="flex font-semibold text-sm gap-6">
            {navName &&
              navName?.map(nav => (
                <Link
                  key={nav.name}
                  to={nav.href}
                  className={` py-2 hover:text-orange-400 ${
                    pathname === nav.href && 'text-orange-400 font-extrabold border-b-2 border-b-orange-400'
                  }`}
                >
                  <li>{nav?.name}</li>
                </Link>
              ))}
          </ul>
          <div className="flex lg:hidden">
            <button
              className="text-sm min-w-[40px] text-accent-400 font-bold flex items-center justify-center mr-3"
              onClick={handleInviteClick}
            >
              <Plus stroke="rgba(46, 230, 131)" width="18px" height="18px" strokeWidth="6" />
              초대
            </button>
            <button type="button" onClick={handleSetting}>
              <Setting fill="gray" width="18px" height="18px" />
            </button>
          </div>
        </nav>
      </>

      <div className="px-4 sm:px-[40px] lg:grid lg:grid-cols-[1fr_4fr] mx-auto lg:gap-8 lg:max-w-[1280px] pt-3 lg:py-3">
        <aside className="lg:sticky top-[140px] hidden lg:block border rounded-xl h-[250px] p-4">
          <div className="flex justify-between">
            <span className="font-bold text-xl">{meetingInfo.name}</span>
            <button type="button" onClick={handleSetting}>
              <Setting fill="gray" width="18px" height="18px" />
            </button>
          </div>
          <div className="text-xs my-2 text-slate-400 line-clamp-2">{meetingInfo?.introduce}</div>
          <button
            className="text-xs min-w-[40px] text-accent-400 font-bold flex items-center justify-center mr-3"
            onClick={handleInviteClick}
          >
            <Plus stroke="rgba(46, 230, 131)" width="18px" height="18px" strokeWidth="6" />
            초대
          </button>

          <button className="w-full hover_bg font-bold text-white px-3 py-2 mt-2 rounded-md" onClick={handleCreatePost}>
            글쓰기
          </button>

          <div className="text-xs mt-2 pt-2 text-slate-400 border-t">모임은 초대를 통해서만 가입할 수 있습니다.</div>
        </aside>
        {children}
      </div>
    </div>
  );
};
export default MeetingNav;
