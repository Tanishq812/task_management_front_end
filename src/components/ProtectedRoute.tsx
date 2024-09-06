import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Cookies from 'js-cookie';

const ProtectedRoute = () => {
  const token = Cookies.get('authToken');
  const userData = Cookies.get('userData');
  const user = userData ? JSON.parse(userData) : null;


  if (!token || user?.user_type !== 'admin') {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
