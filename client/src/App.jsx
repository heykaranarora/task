import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './components/Home';
import AdminLogin from './components/AdminLogin';
import Login from './components/login';
import Register from './components/Register';
import UserDetails from './components/UserDetails';

import './App.css';

function App() {
  const appRouter = createBrowserRouter([
    {
      path: '/',
      element: <Home />,
    },
    {
      path: '/admin/login',
      element: <AdminLogin />,
    },
    {
      path: '/login',
      element: <Login />,
    },
    {
      path: '/register',
      element: <Register />,
    },
    {
      path: '/admin/userdetails',
      element:<UserDetails/>
    }
  ]);

  return (
    <RouterProvider router={appRouter} />
  );
}

export default App;
