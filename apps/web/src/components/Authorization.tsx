import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PAGE_ROUTES } from '@/constants';
import { getLocalStorage } from '@/utils/localStorage';

const Authorization = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const loggedIn = getLocalStorage('isLoggedIn');

  useEffect(() => {
    if (!loggedIn) {
      navigate(PAGE_ROUTES.LOGIN);
    }
  }, [loggedIn, navigate]);

  return <div>{children}</div>;
};
export default Authorization;
