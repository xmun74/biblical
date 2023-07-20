import { useQuery } from '@tanstack/react-query';
import { getCheckAuth, getUser } from '@/lib/api';

export const useCheckAuth = () =>
  useQuery(['checkAuth'], getCheckAuth, {
    refetchOnWindowFocus: false, //브라우저 클릭시 refetch 막기
    refetchOnMount: false, /// Mount시 refetch 막기
    refetchOnReconnect: false, /// reconnect시 막기
  });

export const useUserInfo = (userId: number) =>
  useQuery(['userInfo', userId], () => getUser(userId), {
    refetchOnWindowFocus: false,
    enabled: false, // 자동실행 비활성화
  });
