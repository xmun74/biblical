import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import { axiosInstance } from './config/axiosConfig';
import { PAGE_ROUTES } from './lib/constants';
import Bible from './pages/Bible';
import History from './pages/History';
import KakaoLogin from './pages/KakaoLogin';
import Login from './pages/Login';
import Main from './pages/Main';
import MeetingDetail from './pages/MeetingDetail';
import Meetings from './pages/Meetings';
import Profile from './pages/Profile';
import SignUp from './pages/SignUp';

function App() {
  useEffect(() => {
    const getCheck = async () => {
      const res = await axiosInstance.get('/check');
      console.log(res);
    };
    getCheck();
  }, []);
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path={`${PAGE_ROUTES.MAIN}`} element={<Main />} />
        <Route path={`${PAGE_ROUTES.SIGNUP}`} element={<SignUp />} />
        <Route path={`${PAGE_ROUTES.LOGIN}`} element={<Login />} />
        <Route path={`${PAGE_ROUTES.OAUTH_KAKAO}`} element={<KakaoLogin />} />
        <Route path={`${PAGE_ROUTES.BIBLE}`} element={<Bible />} />
        <Route path={`${PAGE_ROUTES.MEETINGS}`} element={<Meetings />} />
        <Route path={`${PAGE_ROUTES.MEETINGS_DETAIL}`} element={<MeetingDetail />} />
        <Route path={`${PAGE_ROUTES.PROFILE}`} element={<Profile />} />
        <Route path={`${PAGE_ROUTES.HISTORY}`} element={<History />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
