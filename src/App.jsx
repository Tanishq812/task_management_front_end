import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import './App.css'
import Login from './sign-in-side/login'

import CreateAccount from "./sign-in-side/CreateAccount";
import CreateCompany from "./sign-in-side/CreateCompany";
import User from "./sign-in-side/User";
import Client from "./sign-in-side/Client";

import HeroLeft from "./components/mytAd/HeroLeft";
import Dashboard from "./components/dashboard/components/Dashboard";

import NotFound from "./components/PageNotFound"

import RouteDashboad from './components/dashboard/RouteDashboad'
import ReportsPage from './components/dashboard/ReportsPage'
import ProtectedRoute from './components/ProtectedRoute'; 
import UserProfile from "./components/dashboard/UserProfile";
function App() {


 const  router = createBrowserRouter(
   createRoutesFromElements(
     <Route>
       <Route index element={<Login />} />
       <Route path="/*" element={<NotFound/>} />
       <Route path="/account" element={<CreateAccount/>} />
       <Route path="/company" element={<CreateCompany/>} />
       <Route path="/user" element={<User/>} />
       <Route path="/client" element={<Client/>} />
       <Route path="/myt-playstore" element={<HeroLeft/>} />


       <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<RouteDashboad />}>
            <Route index element={<Dashboard />} />
            <Route path="reports" element={<ReportsPage />} />
            <Route path="profile" element={<UserProfile />} />
          </Route>
        </Route>

     </Route>
   )
 );
  return (
    <>
 <RouterProvider router={router} />
    
    </>
  )
}

export default App
