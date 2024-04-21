import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Outlet, createBrowserRouter, RouterProvider} from 'react-router-dom';
import Navigation from './components/Navigation/Navigation-bonus';
import * as sessionActions from './store/session';
import { Modal } from './context/Modal';
import './App.css'
import LoginFormPage from './components/LoginFormPage';
import SignupFormPage from './components/SignupFormPage';
import LandingPage from './components/LandingPage/LandingPage';

// import {  Routes, Route } from 'react-router-dom';
// import {UserContextProvider} from "./UserContext";


function Layout() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => {
      setIsLoaded(true)
    });
  }, [dispatch]);

  return (
    <>
      <Modal/>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && <Outlet />}
    </>
  );
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        // element: <h1>Welcome!</h1>
        element: <LandingPage />
      },
      {
        path: '/login',
        element: <LoginFormPage />
      },
      {
        path: '/signup',
        element: <SignupFormPage />
      }
    ]
  }
]);

function App() {
  return (
    <>
    <RouterProvider router={router} />
    </>

  );
}

export default App;
