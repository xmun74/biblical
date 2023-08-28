import MeetingNav from '@/components/MeetingNav';
import { PAGE_ROUTES } from '@/lib/constants';
import Bible from '@/pages/Bible';
import History from '@/pages/History';
import KakaoLogin from '@/pages/KakaoLogin';
import Login from '@/pages/Login';
import Main from '@/pages/Main';
import MeetingDetail from '@/pages/MeetingDetail';
import MeetingInvite from '@/pages/MeetingInvite';
import MeetingMember from '@/pages/MeetingMember';
import MeetingPosts from '@/pages/MeetingPosts';
import Meetings from '@/pages/Meetings';
import Profile from '@/pages/Profile';
import ProfileEdit from '@/pages/ProfileEdit';
import SignUp from '@/pages/SignUp';

interface RouteInfoProp {
  path: string;
  element: JSX.Element;
  errorElement?: JSX.Element;
  withAuth: boolean;
  label?: string;
  children?: RouteInfoProp[];
}

export const RouteInfo: RouteInfoProp[] = [
  {
    path: PAGE_ROUTES.MAIN,
    element: <Main />,
    withAuth: false,
    label: 'Biblical',
  },
  {
    path: PAGE_ROUTES.SIGNUP,
    element: <SignUp />,
    withAuth: false,
    label: '회원가입',
  },
  {
    path: PAGE_ROUTES.LOGIN,
    element: <Login />,
    withAuth: false,
    label: '로그인',
  },
  {
    path: PAGE_ROUTES.OAUTH_KAKAO,
    element: <KakaoLogin />,
    withAuth: false,
    label: '카카오 로그인',
  },
  {
    path: PAGE_ROUTES.BIBLE,
    element: <Bible />,
    withAuth: false,
    label: '성경읽기',
  },
  {
    path: PAGE_ROUTES.MEETINGS,
    element: <Meetings />,
    withAuth: false,
    label: '모임',
  },
  {
    path: PAGE_ROUTES.MEETINGS_DETAIL,
    element: (
      <>
        <MeetingNav>
          <MeetingDetail />
        </MeetingNav>
      </>
    ),
    withAuth: true,
    label: '모임 상세',
  },
  {
    path: PAGE_ROUTES.MEETINGS_MEMBER,
    element: (
      <>
        <MeetingNav>
          <MeetingMember />
        </MeetingNav>
      </>
    ),
    withAuth: true,
    label: '모임 멤버',
  },
  {
    path: PAGE_ROUTES.MEETINGS_POST,
    element: (
      <>
        <MeetingNav>
          <MeetingPosts />
        </MeetingNav>
      </>
    ),
    withAuth: true,
    label: '모임 게시글',
  },
  {
    path: PAGE_ROUTES.MEETINGS_INVITE,
    element: <MeetingInvite />,
    withAuth: false,
    label: '모임 초대',
  },
  {
    path: PAGE_ROUTES.PROFILE,
    element: <Profile />,
    withAuth: true,
    label: '프로필',
  },
  {
    path: PAGE_ROUTES.PROFILE_EDIT,
    element: <ProfileEdit />,
    withAuth: true,
    label: '프로필 수정',
  },
  {
    path: PAGE_ROUTES.HISTORY,
    element: <History />,
    withAuth: true,
    label: 'MY 성경기록',
  },
];
