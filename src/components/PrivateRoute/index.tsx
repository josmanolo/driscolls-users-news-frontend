import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";

interface PrivateRouteProps {
  children: React.ReactElement;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const isAuthenticatedState = useSelector(
    (state: RootState) => !!state.auth.token 
  );

  const isAuthenticatedSession = !!sessionStorage.getItem('authToken');
  const isAuthenticated = isAuthenticatedState || isAuthenticatedSession;

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default PrivateRoute;
