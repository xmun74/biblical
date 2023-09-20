import { useQuery } from '@tanstack/react-query';
import { getMeetingAPI } from '@/apis';
import { QUERY_KEYS } from '@/constants';
import { getLocalStorage } from '@/utils/localStorage';

const loggedIn: boolean = getLocalStorage('isLoggedIn');

export const useGetMeeting = (meetId: number) =>
  useQuery([QUERY_KEYS.MY_MEETINGS, meetId], () => getMeetingAPI(meetId), {
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    enabled: Boolean(loggedIn),
  });
