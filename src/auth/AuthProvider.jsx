import { useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";

function AuthProvider({ children }) {
    const [token, setToken] = useState(localStorage.getItem('token') || null);
    const [user, setUser] = useState(null);

    useEffect(() => {
        if (token) {
            localStorage.setItem('token', token);
            const userData = JSON.parse(atob(token.split('.')[1]));
            setUser({ id: userData.user.id});
        } else {
            localStorage.removeItem('token');
            setUser(null);
        }
    }, [token]);



    function logout() {
        setToken(null);
    }

    return (
        <AuthContext.Provider value={{ token, user, setToken, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;
