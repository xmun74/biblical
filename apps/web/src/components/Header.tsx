import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div className="p-6">
      <Link to="/">홈 </Link>
      <Link to="/auth/login">로그인 </Link>
      <Link to="/auth/signup">회원가입</Link>
    </div>
  );
};
export default Header;
