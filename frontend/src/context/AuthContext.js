import { createContext, useState, useEffect } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState({
        token: null,
        user: null,
    });

    useEffect(() => {
        const token = localStorage.getItem('token');
        const user = localStorage.getItem('user');

        if (token && user) {
            try {
                const parsedUser = JSON.parse(user);
                setIsAuthenticated({ token, user: parsedUser });
            } catch (error) {
                console.error('Failed to parse user from localStorage', error);
                setIsAuthenticated({ token: null, user: null });
            }
        }
    }, []);

    const login = (token, user) => {
        setIsAuthenticated({ token, user });
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
    };

    const logout = () => {
        setIsAuthenticated({ token: null, user: null });
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthProvider, AuthContext };