import { useQuery } from '@tanstack/react-query';
import { getMeetingsAPI } from '@/apis';
import { QUERY_KEYS } from '@/constants';
import { getLocalStorage } from '@/utils/localStorage';

const loggedIn: boolean = getLocalStorage('isLoggedIn');

export const useGetMyMeetings = () =>
  useQuery<{ meetings: Meetings[] }>([QUERY_KEYS.MY_MEETINGS], getMeetingsAPI, {
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    enabled: Boolean(loggedIn),
  });
