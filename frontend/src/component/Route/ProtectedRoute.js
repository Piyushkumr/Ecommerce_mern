import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom';
import Loader from '../layout/Loader/Loader';

const ProtectedRoute = ({ isAdmin, children }) => {
    const { loading, isAuthenticated, user } = useSelector((state) => state.user);

    if (loading) {
        return <Loader />; // or a loading spinner
    }

    if (isAuthenticated === false) {
        return <Navigate to="/login" replace />;
    }

    if(isAdmin === true && user.role !== "admin"){
        return <Navigate to='/account' />
    }

    return children;
}

export default ProtectedRoute;