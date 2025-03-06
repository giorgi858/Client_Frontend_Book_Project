import { Link, Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import api from "../api";
import { REFRESH_TOKEN, ACCESS_TOKEN } from "../constants";
import { useEffect, useState } from "react";
import useIsAuthorized from "../hooks/useIsAuthorized";

const ProtectedRoute = ({ children }) => {
    const {isAuthorized, setIsAuthorized} =useIsAuthorized()

    useEffect(() => {
        auth().catch(() => setIsAuthorized(false))
    },[])

    const refreshToken = async () => {
        const refreshToken = localStorage.getItem(REFRESH_TOKEN)
        try {
            const response = await api.post('/api/token/refresh/',{
                refresh: refreshToken
            })
            if (response.status === 200) {
                localStorage.setItem(ACCESS_TOKEN, response.data.access)
                setIsAuthorized(true)
            } else {
                setIsAuthorized(false)
                console.log('d');
            }
        } catch (error) {
            console.log(error);
            setIsAuthorized(false)
        }
    }
    const auth = async () => {
        const token = localStorage.getItem(ACCESS_TOKEN)
        if (!token) {
            setIsAuthorized(false)
            console.log('when we have not access token the authorize is false ');

            return
        }
        const decode = jwtDecode(token)
        const tokenExpiration = decode.exp
        const now = Date.now() / 1000
        if (tokenExpiration < now) {
            await refreshToken()
        } else {
            setIsAuthorized(true)
        }
    }
  return  isAuthorized && children ? children : <div className="div-login-in-protectedRoute">
    <h1>hello everyone</h1>
    <Link to='/login'>START LOGIN</Link>    
  </div>
}

export default ProtectedRoute