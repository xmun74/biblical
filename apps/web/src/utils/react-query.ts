import { useQuery } from '@tanstack/react-query';
import { getLocalStorage } from './localStorage';
import { getMeAPI, getMeetingsAPI } from '@/lib/api';
import { QUERY_KEYS } from '@/lib/constants';

const loggedIn: boolean = getLocalStorage('isLoggedIn');
export const useMyInfo = () =>
  useQuery([QUERY_KEYS.MY_INFO], getMeAPI, {
    refetchOnWindowFocus: false, // 브라우저 클릭시 refetch 막기
    refetchOnMount: false, // Mount시 refetch 막기
    refetchOnReconnect: false, // reconnect시 막기
    enabled: Boolean(loggedIn), // 로그인했을 때만 fetch
  });
export const useMyMeetings = () =>
  useQuery<{ meetings: MeetingsProps[] }>([QUERY_KEYS.MY_MEETINGS], getMeetingsAPI, {
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    enabled: Boolean(loggedIn),
  });
