import './App.css'
import {  createBrowserRouter, RouterProvider } from 'react-router-dom'

// import Navbar from './components/elements/Navbar'
import Dashboard from './pages/Dashboard';
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import FrontPage from './pages/FrontPage';
import Jobs from './pages/Jobs';
import Browse from './pages/Browse';
import StudentProfile from './pages/StudentProfile';
import AppliedJob from './pages/AppliedJob';
import JobDescription from './pages/JobDescription';
import EditStudentProfile from './pages/EditStudentProfile';

const appRouter = createBrowserRouter([
  {
    path:'/',
    element:<FrontPage/>
  },
  {
    path:'/login',
    element:<Login/>
  },
  {
    path:'/signup',
    element:<Signup/>
  },
  {
    path:'/dashboard',
    element:<Dashboard/>
  },
  {
    path:'/jobs',
    element:<Jobs/>
  },
  {
    path:'/browse',
    element:<Browse/>
  },
  {
    path:'/student/profile',
    element:<StudentProfile/>
  },
  {
    path:'/student/profile/edit',
    element:<EditStudentProfile/>
  },
  {
    path:'/student/application',
    element:<AppliedJob/>
  },
  {
    path:'/job/description/:id',
    element:<JobDescription/>
  },

])

function App() {

  return (
    
    <div className="h-screen bg-gradient-to-br from-[#fff1eb] to-[#ace0f9] bg-fixed flex flex-col">
      <RouterProvider router={appRouter} />
  </div>
  
  )
}

export default App


  