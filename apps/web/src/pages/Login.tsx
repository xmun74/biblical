import { Link } from 'react-router-dom';
import KakaoLoginBtn from '@/components/KakaoLoginBtn';

const Login = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="w-4/5">
        <div className="flex justify-center text-2xl font-light">로그인</div>
        <form className="flex justify-center mt-10">
          <div className="flex flex-col w-full max-w-xs">
            <label className="mt-4 text-xs">이메일</label>
            <input type="email" placeholder="example@naver.com" className="sign_input" />

            <label className="mt-4 text-xs">비밀번호</label>
            <input type="password" placeholder="******" className="sign_input" />

            <button type="submit" className="sign_form_submit_btn hover_bg">
              로그인
            </button>
            <div className="flex justify-between font-thin">
              아직 계정이 없다면?
              <Link to="/auth/signup" className="font-semibold hover_text">
                회원가입
              </Link>
            </div>
            <div className="relative my-10 text-slate-300 border-t text-center">
              <div className="absolute left-[45%] top-[-14px] bg-white px-2 text-center">or</div>
            </div>
            <div className="flex justify-center mb-4 font-thin">SNS 계정으로 로그인하기</div>
            <div className="flex justify-center">
              <KakaoLoginBtn />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Login;
