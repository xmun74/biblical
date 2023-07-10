import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import KakaoLogin from './pages/KakaoLogin';
import Login from './pages/Login';
import Main from './pages/Main';
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
      </Routes>
    </BrowserRouter>
  );
}
export default App;
