import { useQuery } from '@tanstack/react-query';
import { getMeAPI, getUserAPI } from '@/lib/api';

export const useMyInfo = () =>
  useQuery(['userInfo'], getMeAPI, {
    refetchOnWindowFocus: false, //브라우저 클릭시 refetch 막기
    refetchOnMount: false, /// Mount시 refetch 막기
    refetchOnReconnect: false, /// reconnect시 막기
  });

export const useUserInfo = (userId: number) =>
  useQuery(['userInfo1', userId], () => getUserAPI(userId), {
    refetchOnWindowFocus: false,
    enabled: false, // 자동실행 비활성화 - 특정이벤트 시 실행
  });
