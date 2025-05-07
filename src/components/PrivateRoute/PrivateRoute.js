import { jwtDecode } from 'jwt-decode';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PrivateRoute = ({ children }) => {
    let isAuthenticated = true;
    const { token } = useAuth();
    if (!token) isAuthenticated = false;

    try {
        const { exp } = jwtDecode(token);

        isAuthenticated = Date.now() < exp * 1000;
    } catch {
        isAuthenticated = false;
    }

    return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;
