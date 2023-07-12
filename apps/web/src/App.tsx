import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Bible from './pages/Bible';
import History from './pages/History';
import KakaoLogin from './pages/KakaoLogin';
import Login from './pages/Login';
import Main from './pages/Main';
import MeetingDetail from './pages/MeetingDetail';
import Meetings from './pages/Meetings';
import MyPage from './pages/MyPage';
import SignUp from './pages/SignUp';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/auth/signup" element={<SignUp />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/kakao" element={<KakaoLogin />} />
        <Route path="/bible" element={<Bible />} />
        <Route path="/meetings" element={<Meetings />} />
        <Route path="/meetings:meetId" element={<MeetingDetail />} />
        <Route path="/users/:userId/edit" element={<MyPage />} />
        <Route path="/users/:userId/history" element={<History />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
