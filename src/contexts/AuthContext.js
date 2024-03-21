import React, { createContext, useContext } from 'react';
import useAuth from '../hooks/useAuth';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const { currentUser, logOut } = useAuth();
    const value = { currentUser, logOut };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => useContext(AuthContext);
