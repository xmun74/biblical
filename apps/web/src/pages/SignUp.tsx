import { Link } from 'react-router-dom';

const SignUp = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="w-4/5">
        <div className="flex justify-center text-2xl font-light">회원가입</div>
        <form className="flex justify-center mt-10">
          <div className="flex flex-col w-full max-w-xs">
            <label className="mt-4 text-xs">이메일</label>
            <input
              className="border border-slate-200 rounded-md sign_input"
              type="email"
              placeholder="biblical@gmail.com"
            />

            <label className="mt-4 text-xs">닉네임</label>
            <input
              className="border border-slate-200 rounded-md sign_input"
              type="text"
              placeholder="닉네임 (2~15자)"
            />
            <label className="mt-4 text-xs">비밀번호</label>
            <input
              className="border border-slate-200 rounded-md sign_input"
              type="password"
              placeholder="비밀번호 (8~16자)"
            />
            <label className="mt-4 text-xs">비밀번호 확인</label>
            <input
              className="border border-slate-200 rounded-md sign_input"
              type="password"
              placeholder="비밀번호 확인"
            />
            <button type="submit" className="sign_form_submit_btn hover_bg">
              회원가입
            </button>
            <div className="flex justify-between font-thin">
              아이디가 이미 있다면?
              <Link to="/auth/login" className="font-semibold hover_text">
                로그인
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
export default SignUp;
