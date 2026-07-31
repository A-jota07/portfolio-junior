import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { getAdminSession } from '../lib/supabaseClient';

export default function RequireAuth({ children }) {
  const session = getAdminSession();
  const location = useLocation();

  if (!session) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}
