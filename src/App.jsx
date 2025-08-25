
import {RouterProvider}  from 'react-router';
import router from './components/router/routes';
import './app.css'

function App() {
  
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
