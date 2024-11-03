import './App.css'
import {  createBrowserRouter, RouterProvider } from 'react-router-dom'

// import Navbar from './components/elements/Navbar'
import Dashboard from './pages/Dashboard';
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';

const appRouter = createBrowserRouter([
  {
    path:'/',
    element:<Dashboard/>
  },
  {
    path:'/login',
    element:<Login/>
  },
  {
    path:'/signup',
    element:<Signup/>
  },
])

function App() {

  return (
    
    <div className='min-h-screen bg-gradient-to-br from-[#fff1eb] to-[#ace0f9] flex flex-col'>
  <RouterProvider router={ appRouter}/>
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
  