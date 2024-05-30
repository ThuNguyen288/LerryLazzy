import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';

function PrivateRoute() {
    const { isAuthenticated } = useContext(AuthContext);

    return isAuthenticated ? <Navigate to="/" /> : <Navigate to="/login" />;
};

export default PrivateRoute;
