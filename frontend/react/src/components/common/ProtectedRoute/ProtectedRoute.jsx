import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";
import Loading from "../../ui/Loading/Loading";
const ProtectedRoute = ({ children, requiredRole = null}) => { 
    const {user, isAuthenticated, loading} = useAuth();
    const location = useLocation();
    if(loading) {
        return (
            <div className="loading-container">
                <Loading size="large" text="đang xác thực"/>
            </div>
        );
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" state={{ from: location }} replace/>;
    }

    if(requiredRole && user.role !== requiredRole) {
        return <Navigate to="/" replace/>;
    }

    return children;
};

export default ProtectedRoute;