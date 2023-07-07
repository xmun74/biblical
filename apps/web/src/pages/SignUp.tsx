import { Link } from 'react-router-dom';

const SignUp = () => {
  return (
    <div>
      <div className="flex flex-col items-center w-full">
        <div className="pt-6 pb-10 font-light">JOIN</div>
        <form className="flex flex-col w-[300px]">
          <label>아이디</label>
          <input className="border border-slate-200 rounded-md" type="text" />
          <label>닉네임</label>
          <input className="border border-slate-200 rounded-md" type="text" />
          <label>비밀번호</label>
          <input className="border border-slate-200 rounded-md" type="password" />
          <label>비밀번호 확인</label>
          <input className="border border-slate-200 rounded-md" type="password" />
          <button className="bg-emerald-300 rounded-md p-2 my-4 hover:bg-emerald-200 ">회원가입</button>
        </form>
        <div>
          아이디가 이미 있다면?{' '}
          <Link to="/auth/login" className="hover:font-bold text-emerald-500">
            로그인
          </Link>
        </div>
      </div>
    </div>
  );
};
export default SignUp;
