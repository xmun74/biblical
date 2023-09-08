import { lazy } from 'react';
import MeetingNav from '@/components/MeetingNav';
import { PAGE_ROUTES } from '@/constants';
import History from '@/pages/History';
import KakaoLogin from '@/pages/KakaoLogin';

interface RouteInfoProp {
  path: string;
  element: JSX.Element;
  errorElement?: JSX.Element;
  withAuth: boolean;
  label?: string;
  children?: RouteInfoProp[];
}
const SignUp = lazy(() => import(/* webpackChunkName: "sign" */ '@/pages/SignUp'));
const Login = lazy(() => import(/* webpackChunkName: "login" */ '@/pages/Login'));
const Main = lazy(() => import(/* webpackChunkName: "home" */ '@/pages/Main'));
const Bible = lazy(() => import(/* webpackChunkName: "bible" */ '@/pages/Bible'));
const Meetings = lazy(() => import(/* webpackChunkName: "meetings" */ '@/pages/Meetings'));
const MeetingDetail = lazy(() => import(/* webpackChunkName: "meeting-detail" */ '@/pages/MeetingDetail'));
const MeetingInvite = lazy(() => import(/* webpackChunkName: "meeting-invite" */ '@/pages/MeetingInvite'));
const MeetingMember = lazy(() => import(/* webpackChunkName: "meeting-member" */ '@/pages/MeetingMember'));
const MeetingPosts = lazy(() => import(/* webpackChunkName: "meeting-posts" */ '@/pages/MeetingPosts'));
const Profile = lazy(() => import(/* webpackChunkName: "profile" */ '@/pages/Profile'));
const ProfileEdit = lazy(() => import(/* webpackChunkName: "profile-edit" */ '@/pages/ProfileEdit'));

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
