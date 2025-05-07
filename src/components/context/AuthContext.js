import { createContext, useContext, useState } from 'react';
import { jwtDecode } from 'jwt-decode';

// Tạo context
const AuthContext = createContext();

// Provider
export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem('token'));

    const login = (newToken) => {
        localStorage.setItem('token', newToken);
        setToken(newToken);
    };

    const logout = () => {
        localStorage.removeItem('token');
        setToken(null);
    };

    const info = () => {
        return jwtDecode(token);
    };
    return <AuthContext.Provider value={{ token, login, logout, info }}>{children}</AuthContext.Provider>;
};

// Hook dùng trong component khác
export const useAuth = () => useContext(AuthContext);
