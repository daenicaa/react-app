import React, { createContext, useState, useEffect } from 'react';

const AuthContext = createContext()

function AuthProvider(props) {
    const [user, setUser] = useState({ token: null })
    useEffect(() => {
        if (localStorage.getItem('token')) {
            setUser({ token: localStorage.getItem('token') })
        }
    }, [])
    const logout = () => {
        localStorage.removeItem('token')
    }
    return (
        <AuthContext.Provider
            value={{ user: user, logout }}
            {...props}
        />
    )
}
export { AuthContext, AuthProvider }
