import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useCallback, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import KakaoLoginBtn from '@/components/KakaoLoginBtn';
import User from '@/interfaces/user';
import { loginAPI } from '@/lib/api';

const Login = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [EmailErrMsg, setEmailErrMsg] = useState(false);
  const [pwdErrMsg, setPwdErrMsg] = useState(false);
  const [loginErrMsg, setLoginErrMsg] = useState('');
  // const [loading, setLoading] = useState(false);

  const { mutate } = useMutation<User, AxiosError, { email: string; password: string }>(['userInfo'], loginAPI, {
    onMutate: () => {
      // setLoading(true);
    },
    onError: error => {
      setLoginErrMsg(`${error.response?.data}`);
    },
    onSuccess: user => {
      queryClient.setQueryData(['userInfo'], user);
      navigate('/');
    },
    onSettled: () => {
      // setLoading(false);
    },
  });

  const emailValid = (value: string) => {
    const emailReg = RegExp(/^[\w-.]+@([\w-]+\.)+[\w-]{2,3}$/);
    const isValid = emailReg.test(value);
    return isValid;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { type, value } = e.target;
    setLoginErrMsg('');
    if (type === 'email') {
      setEmail(value);
      const isValid = emailValid(value);
      if (!isValid) {
        setEmailErrMsg(true);
        return;
      } else {
        setEmailErrMsg(false);
      }
    } else {
      if (value.length < 6) {
        setPwdErrMsg(true);
      } else {
        setPwdErrMsg(false);
        setPassword(value);
      }
    }
  };
  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const isValid = emailValid(email);
      if (!isValid) {
        return;
      }
      mutate({ email, password });
    },
    [email, password, mutate]
  );

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="w-4/5">
        <div className="flex justify-center text-2xl font-light">로그인</div>
        <form className="flex justify-center mt-10" onSubmit={handleSubmit}>
          <div className="flex flex-col w-full max-w-xs">
            <label className="mt-4 text-xs">이메일</label>
            <input type="email" placeholder="example@naver.com" className="sign_input" onChange={handleChange} />
            <div className="text-red-400 text-xs">{EmailErrMsg && '이메일 형식에 맞게 입력해주세요.'}</div>

            <label className="mt-4 text-xs">비밀번호</label>
            <input
              type="password"
              placeholder="******"
              className="sign_input"
              minLength={6}
              maxLength={16}
              onChange={handleChange}
            />
            <div className="flex justify-between">
              <div className="text-red-400 text-xs">{pwdErrMsg && '6-16자로 입력해주세요.'}</div>
              <div className="text-red-400 text-xs">{loginErrMsg && loginErrMsg}</div>
            </div>
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
