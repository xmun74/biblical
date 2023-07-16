import axios, { AxiosError } from 'axios';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { API_URL } from '@/config';

const SignUp = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [pwdMatchErr, setPwdMatchErr] = useState(false);
  const [pwdErrMsg, setPwdErrMsg] = useState(false);
  const [EmailErrMsg, setEmailErrMsg] = useState('');
  const [nickErrMsg, setNickErrMsg] = useState('');

  const onPwdMatch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const pwdConfirm = e.target.value;
    if (password !== pwdConfirm) {
      setPwdMatchErr(true);
    } else {
      setPwdMatchErr(false);
    }
  };
  const onEmailValid = (value: string) => {
    const emailReg = RegExp(/^[\w-.]+@([\w-]+\.)+[\w-]{2,3}$/);
    const isValid = emailReg.test(value);
    return isValid;
  };
  const handleSignUpBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEmailErrMsg('');
    setNickErrMsg('');
    if (name === 'email') {
      const isEmailValid = onEmailValid(value);
      if (!isEmailValid) {
        setEmailErrMsg('이메일 형식에 맞게 입력해주세요.');
        return;
      } else {
        setEmail(value);
        setEmailErrMsg('');
      }
    } else if (name === 'nickname') {
      if (value.length < 2 || value.length > 15) {
        setNickErrMsg('2자 이상 15자 이하로 입력해주세요');
      } else {
        setNickname(value);
        setNickErrMsg('');
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
    if (pwdMatchErr || EmailErrMsg || nickErrMsg || pwdErrMsg) {
      return;
    }
    try {
      const data = await axios.post(
        `${API_URL}/auth/signup`,
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
      const { response } = error as unknown as AxiosError;
      if (response?.data === '중복된 이메일') {
        setEmailErrMsg('중복된 이메일입니다.');
      }
      if (response?.data === '중복된 닉네임') {
        setNickErrMsg('중복된 닉네임입니다.');
      }
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
            <div className="text-red-400 text-xs">{EmailErrMsg && EmailErrMsg}</div>

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
            <div className="text-red-400 text-xs">{nickErrMsg && nickErrMsg}</div>

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
              onChange={onPwdMatch}
            />
            <div className="text-red-400 text-xs">{pwdMatchErr && '비밀번호가 일치하지 않습니다.'}</div>
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
