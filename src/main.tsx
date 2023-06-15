import './index.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import About from './pages/About';
import App from './App';
import Charts from './pages/Charts';
import Create from './pages/Create';
import Home from './pages/Home';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import React from 'react';
import ReactDOM from 'react-dom/client';
import Search from './pages/Search';
import SearchDetails from './pages/SearchDetails';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound />,
    children: [
      {
        path: 'home',
        element: <Home />,
      },
      {
        path: 'about',
        element: <About />,
      },
      {
        path: 'charts',
        element: <Charts />,
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'search',
        element: <Search />,
      },
      {
        path: 'search/:id',
        element: <SearchDetails />,
      },
      {
        path: 'create',
        element: <Create />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
