import { createContext, useState } from 'react';
import Cookies from 'universal-cookie';
import { JWT_COOKIE_NAME } from '../api/constants';

const LoginContext = createContext({});

const cookies = new Cookies();

export const LoginProvider = ({ children }: any) => {
  const [username, setUsername] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);

  const updateIsLoggedIn = () => {
    setIsLoggedIn(cookies.get(JWT_COOKIE_NAME) !== undefined);
  };

  return (
    <LoginContext.Provider value={{ username, setUsername, isLoggedIn, updateIsLoggedIn, error, setError }}>
      {children}
    </LoginContext.Provider>
  )
}

export default LoginContext;
