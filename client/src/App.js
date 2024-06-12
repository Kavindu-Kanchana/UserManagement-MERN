import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AuthProvider } from "./components/AuthContext";

/** import all components */
import Username from './components/LoginUsername';
import Password from './components/LoginPassword';
import Register from './components/Register';
import MainProfile from './components/UserProfile';
import Profile from './components/UpdateProfile';
import Delete from './components/DeleteAccount';
import Recovery from './components/Recovery';
import Reset from './components/Reset';
import PageNotFound from './components/PageNotFound';
import Homepage from './components/Homepage';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
//import ErrorMessage from './components/ErrorMessage';

/**Admin */
import AdminHome from './components/admin/AdminHome';
import AdminUserMgt from './components/admin/AdminUserMgt';
import AdminLogin from './components/admin/AdminLogin';
import AdminRegister from './components/admin/AdminRegister';
import UserUpdate from './components/admin/UserUpdate';

/** auth middleware */
import { AuthorizeUser, ProtectRoute } from './middleware/auth'

/** root routes */
const router = createBrowserRouter([
    {
        path : '/login',
        element : <Username></Username>
    },
    {
        path : '/register',
        element : <Register></Register>
    },
    {
        path : '/password',
        element : <ProtectRoute><Password /></ProtectRoute>
    },
    {
        path : '/mainprofile',
        element : <ProtectRoute><MainProfile /></ProtectRoute>
    },
    {
        path : '/profile',
        element : <AuthorizeUser><Profile /></AuthorizeUser>
    },
    {
        path : '/delete',
        element : <ProtectRoute><Delete /></ProtectRoute>
    },
    {
        path : '/recovery',
        element : <Recovery></Recovery>
    },
    {
        path : '/reset',
        element : <Reset></Reset>
    },
    {
        path : '/',
        element : <Homepage></Homepage>
    },
    {
        path : '/navbar',
        element : <Navbar></Navbar>
    },
    {
        path : '/footer',
        element : <Footer></Footer>
    },
    {
        path : '/Admin',
        element : <AdminHome></AdminHome>
    },
    {
        path : '/admin-user-mgt',
        element : <AdminUserMgt></AdminUserMgt>
    },
    {
        path : '/adminlogin',
        element : <AdminLogin></AdminLogin>
    },
    {
        path : '/adminregister',
        element : <AdminRegister></AdminRegister>
    },
    {
        path : '/edit/:id',
        element : <UserUpdate></UserUpdate>
    },
    {
        path : '*',
        element : <PageNotFound></PageNotFound>
    },
])

function App(){
    return (
      <AuthProvider>
        <main>
          <RouterProvider router={router}></RouterProvider>
        </main>
      </AuthProvider>
    );
}
  
export default App;
