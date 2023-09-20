import { useQuery } from '@tanstack/react-query';
import { getMeAPI } from '@/apis';
import { QUERY_KEYS } from '@/constants';
import { getLocalStorage } from '@/utils/localStorage';

const loggedIn: boolean = getLocalStorage('isLoggedIn');

export const useGetMe = () =>
  useQuery([QUERY_KEYS.MY_INFO], getMeAPI, {
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    enabled: Boolean(loggedIn),
  });
