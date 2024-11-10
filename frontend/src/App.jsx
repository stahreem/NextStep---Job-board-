import './App.css'
import {  createBrowserRouter, RouterProvider } from 'react-router-dom'

// import Navbar from './components/elements/Navbar'
import Dashboard from './pages/Dashboard';
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import FrontPage from './pages/FrontPage';
import Jobs from './pages/Jobs';
import Browse from './pages/Browse';

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

])

function App() {

  return (
    
    <div className="h-screen bg-gradient-to-br from-[#fff1eb] to-[#ace0f9] bg-fixed flex flex-col">
      <RouterProvider router={appRouter} />
  </div>
  
  )
}

export default App

//      <BrowserRouter router = { appRouter }>
  
//  <Routes>
//   <Route path='/' element={<Dashboard/>}/>
//   {/* <Route path='/signin' element={<SignIn/>}/>
//   <Route path='/signup' element={<SignUp/>}/>
//   <Route path='/editor' element={<CreateOrEditBlog/>}/> */}
//  </Routes>

//   </BrowserRouter>
  