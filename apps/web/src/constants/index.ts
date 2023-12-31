export const PAGE_ROUTES = {
  MAIN: '/',
  POST: '/post',
  SIGNUP: '/auth/signup',
  LOGIN: '/auth/login',
  OAUTH_KAKAO: '/auth/kakao',
  BIBLE: '/bible',
  MEETINGS: '/meetings',
  MEETINGS_DETAIL: '/meetings/:meetId',
  MEETINGS_MEMBER: '/meetings/:meetId/member',
  MEETINGS_POST: '/meetings/:meetId/posts',
  MEETINGS_INVITE: '/meetings/:meetId/invite/:inviteLink',
  PROFILE: '/users/:userId',
  PROFILE_EDIT: '/user/edit',
  HISTORY: '/users/:userId/history',
} as const;

export const QUERY_KEYS = {
  MY_MEETINGS: 'myMeetings',
  MY_INFO: 'userInfo',
  OTHER_INFO: 'otherUserInfo',
  MEET_POSTS: 'meetPosts',
  MEETING_MEMBER: 'meetingMember',
  BIBLE_CHAPTER_CNT: 'chapterCount',
  BIBLE: 'bible',
};

export const API_URL = process.env.API_URL;

export const DEFAULT_IMG_URL = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png';

export const MAIN_PAGE_VIEWPORT = '5000px';
export const USER_IMG_FIELD = 'userImg';
