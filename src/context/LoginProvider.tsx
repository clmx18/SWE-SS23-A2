import { createContext, useState } from 'react';

const LoginContext = createContext({});

export const LoginProvider = ({ children }: any) => {
  const [username, setUsername] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);

  return (
    <LoginContext.Provider value={{ username, setUsername, isLoggedIn, setIsLoggedIn, error, setError }}>
      {children}
    </LoginContext.Provider>
  )
}

export default LoginContext;
