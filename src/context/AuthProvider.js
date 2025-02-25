import { useState, createContext } from "react";

const AuthContext = createContext({})

export const AuthProvider = ({ children }) => {
    const [isAuthorized, setIsAuthorized] =useState(null)
    return (
        <AuthContext.Provider value={{ isAuthorized, setIsAuthorized }}>
            { children }
        </AuthContext.Provider>
    )

}
export default AuthContext;