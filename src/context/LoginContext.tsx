import { createContext, useState } from 'react';

export const LoginContext = createContext({});

const LoginProvider = ({ children }: any) => {
  const [user, setUser] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <LoginContext.Provider value={{ user, setUser, isLoggedIn, setIsLoggedIn }}>
      {children}
    </LoginContext.Provider>
  );
};

export default LoginProvider;
