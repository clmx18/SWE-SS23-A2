import './App.css';
import Nav from './components/Nav';
import { Outlet } from 'react-router-dom';

function App() {
  return (
    <>
      <Nav></Nav>
      <Outlet />
    </>
  );
}

export default App;
