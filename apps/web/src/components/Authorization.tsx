import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PAGE_ROUTES } from '@/lib/constants';
import { getLocalStorage } from '@/utils/localStorage';

export interface AuthProps {
  children: React.ReactNode;
}
const Authorization = ({ children }: AuthProps) => {
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
