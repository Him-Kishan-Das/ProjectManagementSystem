import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const PrivateRoute = ({ children }) =>{
    const { isAuthenticated, loading } = useAuth();

    if(loading){
        return <div>Loading authenticated.....</div>;
    }

    return isAuthenticated ? (children || <Outlet /> ) : <Navigate to="/auth" replace />
};

export default PrivateRoute;