import './App.css';
import { useContext, useEffect } from 'react';
import LoginContext from './context/LoginProvider';
import Nav from './components/Nav';
import { Outlet } from 'react-router-dom';

function App() {
  const { updateIsLoggedIn } = useContext(LoginContext);
  useEffect(() => {
    updateIsLoggedIn();
  }, []);

  return (
    <>
      <Nav></Nav>
      <Outlet />
    </>
  );
}

export default App;
