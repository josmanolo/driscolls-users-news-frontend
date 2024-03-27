import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

interface PrivateRouteProps {
    children: React.ReactElement;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const { isAuthenticated } = useAuth();

  if(!isAuthenticated) {
    return <Navigate to='/' replace />
  }

  return children;
};

export default PrivateRoute;