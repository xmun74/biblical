import { Link } from 'react-router-dom';

const KakaoLoginBtn = () => {
  const KAKAO_AUTH_URL = `/auth/kakao`;
  return (
    <Link to={`${KAKAO_AUTH_URL}`}>
      <button className="bg-kakao-login w-[210px] h-[51px] bg-no-repeat bg-cover mt-2" />
    </Link>
  );
};
export default KakaoLoginBtn;
