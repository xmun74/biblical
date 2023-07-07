import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <div>
      <div className="flex flex-col items-center w-full">
        <div className="pt-6 pb-10 font-light">LOGIN</div>
        <form className="flex flex-col w-[300px]">
          <label>아이디</label>
          <input className="border border-slate-200 rounded-md" type="text" />
          <label>비밀번호</label>
          <input className="border border-slate-200 rounded-md" type="password" />
          <button className="bg-emerald-300 rounded-md p-2 my-4 hover:bg-emerald-200 ">로그인</button>
        </form>
        <div>
          아이디가 없다면?{' '}
          <Link to="/auth/signup" className="hover:font-bold text-emerald-500">
            회원가입
          </Link>
          <Link to="/auth/kakao" className="hover:font-bold text-emerald-500">
            카카오로그인
          </Link>
        </div>
      </div>
    </div>
  );
};
export default Login;
