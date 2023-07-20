export const PAGE_ROUTES = {
  MAIN: '/',
  POST: '/post',
  SIGNUP: '/auth/signup',
  LOGIN: '/auth/login',
  OAUTH_KAKAO: '/auth/kakao',
  BIBLE: '/bible',
  MEETINGS: '/meetings',
  MEETINGS_DETAIL: '/meetings/:meetId',
  PROFILE: '/users/:userId',
  HISTORY: '/users/:userId/history',
} as const;