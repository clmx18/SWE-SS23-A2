import './App.css';
import Nav from './components/Nav';
import { Outlet } from 'react-router-dom';
import LoginProvider from './context/LoginContext';

function App() {
  return (
    <>
      <LoginProvider>
        <Nav></Nav>
        <Outlet />
      </LoginProvider>
    </>
  );
}

export default App;
