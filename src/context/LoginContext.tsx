import { createContext, useState } from 'react';
import { Route } from 'react-router-dom';

export const LoginContext = createContext({});

const LoginProvider = () => {
  const [user, setUser] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <LoginContext.Provider value={{ user, isLoggedIn }}>
      <Route path="/"></Route>
    </LoginContext.Provider>
  );
};

export default LoginProvider;
