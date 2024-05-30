import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            // Thực hiện kiểm tra token
            axios.post('/api/login', { token })
                .then(response => {
                    setIsAuthenticated(true);
                    setUser(response.data.user);
                })
                .catch(error => {
                    console.error('Token verification failed:', error);
                    logout(); // Đăng xuất nếu token không hợp lệ
                });
        }
    }, []);

    const login = (token, userInfo) => {
        localStorage.setItem('token', token);
        setIsAuthenticated(true);
        setUser(userInfo);
    };

    const logout = () => {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthProvider, AuthContext };
