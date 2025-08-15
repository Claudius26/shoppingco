import {createBrowserRouter} from 'react-router';
import HomePage from '../pages/homepage/HomePage';
import MainLayout from '../../layout/MainLayout';
import DesignLogo from '../Home/DesignLogo';
import NewArrival from '../pages/clothes/NewArrival';
import TopSelling from '../pages/clothes/TopSelling';
import SignUp from '../signUpHeader/SignUp';
import Login from '../signUpHeader/Login';
import Shop from '../pages/clothes/Shop';



const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'design-logo',
        element: <DesignLogo />,
      },
      {
        path: 'new-arrivals',
        element: <NewArrival />,
      },
      {
        path: 'top-selling',
        element: <TopSelling />,
      },
      {
        path: 'signup',
        element: <SignUp />,
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'shop',
        element: <Shop />,
      },
      
    ]
  },
 
  

]);

export default router;