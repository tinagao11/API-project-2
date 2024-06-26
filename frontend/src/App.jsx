import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Outlet, createBrowserRouter, RouterProvider} from 'react-router-dom';
import Navigation from './components/Navigation/Navigation-bonus';
import * as sessionActions from './store/session';
import { Modal } from './context/Modal';
import './App.css'
// import LoginFormPage from './components/LoginFormPage';
// import SignupFormPage from './components/SignupFormPage';
import LandingPage from './components/LandingPage/LandingPage';
import SpotDetails from './components/SpotDetails/SpotDetails';
import CreateSpot from './components/CreateSpot/CreateSpot';
import UpdateSpot from './components/UpdateSpot/UpdateSpot';
import ManageSpot from './components/ManageSpot';

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
        element: <LandingPage />
      },
      {
        path: '/spots/:spotId',
        element: <SpotDetails />
      },
      {
        path: '/spots/current',
        element: <ManageSpot />
      },
      {
        path: '/spots/new',
        element: <CreateSpot />
      },
      {
        path: '/spots/:spotId/edit',
        element: <UpdateSpot />
      },
      // {
      //   path: '/login',
      //   element: <LoginFormPage />
      // },
      // {
      //   path: '/signup',
      //   element: <SignupFormPage />
      // },
      {
        path: '*',
        element: <h1>Page Not Found</h1>
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
