import { createContext, useEffect, useState } from 'react';
import Cookie from '../api/cookie';

// defaultValue wird hier gesondert erzeugt, um ihm explizit den Typ 'any' geben zu können.
// Damit werden in den nutzenden Komponenten keine verwirrenden TS-Fehler mehr angezeigt.
const defaultValue: any = {};
const LoginContext = createContext(defaultValue);

const cookie = new Cookie();

export const LoginProvider = ({ children }: any) => {
  const [username, setUsername] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState(undefined);

  const updateIsLoggedIn = () => {
    setIsLoggedIn(cookie.checkAuthCookie());
  };

  useEffect(() => {
    setUsername(isLoggedIn ? cookie.getAuthCookie().username : '');
  }, [isLoggedIn]);

  return (
    <LoginContext.Provider
      value={{
        username,
        setUsername,
        isLoggedIn,
        updateIsLoggedIn,
        error,
        setError,
      }}
    >
      {children}
    </LoginContext.Provider>
  );
};

export default LoginContext;
