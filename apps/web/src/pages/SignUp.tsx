import axios from 'axios';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const SignUp = () => {
  const URL = process.env.API_URL;
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [pwdValidErrMsg, setpwdValidErrMsg] = useState(false);
  const [EmailErrMsg, setEmailErrMsg] = useState(false);
  const [nickErrMsg, setNickErrMsg] = useState(false);
  const [pwdErrMsg, setPwdErrMsg] = useState(false);
  const [signErrMsg, setSignErrMsg] = useState(false);

  const onPwdValid = (e: React.ChangeEvent<HTMLInputElement>) => {
    const pwdConfirm = e.target.value;
    if (password !== pwdConfirm) {
      setpwdValidErrMsg(true);
    } else {
      setpwdValidErrMsg(false);
    }
  };
  const emailValid = (value: string) => {
    const emailReg = RegExp(/^[\w-.]+@([\w-]+\.)+[\w-]{2,3}$/);
    const isValid = emailReg.test(value);
    return isValid;
  };
  const handleSignUpBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSignErrMsg(false);
    if (name === 'email') {
      const isEmailValid = emailValid(value);
      if (!isEmailValid) {
        setEmailErrMsg(true);
        return;
      } else {
        setEmail(value);
        setEmailErrMsg(false);
      }
    } else if (name === 'nickname') {
      if (value.length < 2 || value.length > 15) {
        setNickErrMsg(true);
      } else {
        setNickname(value);
        setNickErrMsg(false);
      }
    } else {
      if (value.length < 6 || value.length > 16) {
        setPwdErrMsg(true);
      } else {
        setPassword(value);
        setPwdErrMsg(false);
      }
    }
  };

  const handleSignUpSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (pwdValidErrMsg || EmailErrMsg || nickErrMsg || pwdErrMsg || signErrMsg) {
      return;
    }
    // console.log('전송됨', email, nickname, password);
    try {
      const data = await axios.post(
        `${URL}/auth/signup`,
        { email, nickname, password },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      console.log('회원가입 성공', data);
      navigate('/auth/login');
    } catch (error) {
      setSignErrMsg(true);
      console.log(error);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="w-4/5">
        <div className="flex justify-center text-2xl font-light">회원가입</div>
        <form className="flex justify-center mt-10" onSubmit={handleSignUpSubmit}>
          <div className="flex flex-col w-full max-w-xs">
            <label className="mt-4 text-xs">이메일</label>
            <input
              className="border border-slate-200 rounded-md sign_input"
              type="email"
              name="email"
              placeholder="biblical@gmail.com"
              onBlur={handleSignUpBlur}
            />
            <div className="text-red-400 text-xs">{EmailErrMsg && '이메일 형식에 맞게 입력해주세요.'}</div>

            <label className="mt-4 text-xs">닉네임</label>
            <input
              className="border border-slate-200 rounded-md sign_input"
              type="text"
              name="nickname"
              placeholder="닉네임 (2~15자)"
              minLength={2}
              maxLength={15}
              onBlur={handleSignUpBlur}
            />
            <div className="text-red-400 text-xs">{nickErrMsg && '2자 이상 15자 이하로 입력해주세요'}</div>

            <label className="mt-4 text-xs">비밀번호</label>
            <input
              className="border border-slate-200 rounded-md sign_input"
              type="password"
              name="password"
              placeholder="비밀번호 (6~16자)"
              minLength={6}
              maxLength={16}
              onBlur={handleSignUpBlur}
            />
            <div className="text-red-400 text-xs">{pwdErrMsg && '6-16자로 입력해주세요.'}</div>
            <label className="mt-4 text-xs">비밀번호 확인</label>
            <input
              className="border border-slate-200 rounded-md sign_input"
              type="password"
              placeholder="비밀번호 확인"
              minLength={6}
              maxLength={16}
              onChange={onPwdValid}
            />
            <div className="text-red-400 text-xs">{pwdValidErrMsg && '비밀번호가 일치하지 않습니다.'}</div>
            <div className="text-red-400 text-xs">{signErrMsg && '회원가입에 실패했습니다'}</div>
            <button
              type="submit"
              className="sign_form_submit_btn hover_bg"
              disabled={email === '' || nickname === '' || password === '' ? true : false}
            >
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
