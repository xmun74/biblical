import { useQuery } from '@tanstack/react-query';
import { getMeAPI } from '@/lib/api';

const History = () => {
  // const queryClient = new QueryClient();
  // const loggedIn = queryClient.getQueryData(['loggedIn']);

  const { data: myUserInfo } = useQuery<UserProps>(['userInfo'], getMeAPI);

  return (
    <>
      {myUserInfo && myUserInfo.nickname}
      History 페이지
    </>
  );
};
export default History;
