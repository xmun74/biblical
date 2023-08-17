import { useQuery } from '@tanstack/react-query';
import { getMeAPI } from '@/lib/api';
import User from '@/types/user';

const History = () => {
  // const queryClient = new QueryClient();
  // const loggedIn = queryClient.getQueryData(['loggedIn']);

  const { data: myUserInfo } = useQuery<User>(['userInfo'], getMeAPI);

  return (
    <>
      {myUserInfo && myUserInfo.nickname}
      History 페이지
    </>
  );
};
export default History;
