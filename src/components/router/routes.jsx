import {createBrowserRouter} from 'react-router';
import HomePage from '../pages/homepage/HomePage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />
  },
  {
    path: '/homePage',
    element: <HomePage />
  }

]);

export default router;