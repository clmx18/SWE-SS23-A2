import { createContext, useEffect, useState } from 'react';
import Cookie from '../api/cookie';

const LoginContext = createContext({});

const cookie = new Cookie();

export const LoginProvider = ({ children }: any) => {
  const [username, setUsername] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);

  const updateIsLoggedIn = () => {
    setIsLoggedIn(cookie.checkAuthCookie());
  };

  useEffect(() => {
    if(!isLoggedIn) {
      setUsername('');
    }
    else {
      const { username } = cookie.getAuthCookie();
      setUsername(username);
    }
  }, [isLoggedIn])

  return (
    <LoginContext.Provider value={{ username, setUsername, isLoggedIn, updateIsLoggedIn, error, setError }}>
      {children}
    </LoginContext.Provider>
  )
}

export default LoginContext;
