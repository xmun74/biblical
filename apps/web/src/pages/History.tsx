import { useQuery } from '@tanstack/react-query';
import { getMeAPI } from '@/apis';

const History = () => {
  const { data: myUserInfo } = useQuery<User>(['userInfo'], getMeAPI);

  return (
    <>
      {myUserInfo && myUserInfo.nickname}
      History 페이지
    </>
  );
};
export default History;
