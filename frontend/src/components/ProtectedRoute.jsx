/* eslint-disable no-unused-vars */
// create wrapper for protected route, only requests with access tokens can access this route.

import { Navigate } from "react-router-dom"
import { jwtDecode } from "jwt-decode"
import api from "../api"
import { REFRESH_TOKEN, ACCESS_TOKEN } from "../constants"
import { useState } from 'react'

// Protected route component for only authorized users
// eslint-disable-next-line react/prop-types
function ProtectedRouter({children}) {
    // create state to track authorization status
    const [isAuthorized, setIsAuthorized] = useState(null)

    // refresh access token automatically
    const refreshToken = async () => {
        // get refresh token from localstorage
        const refreshToken = localStorage.getItem(REFRESH_TOKEN)

        // make api i call to get a new access token
        try{
            const res = await api.post("/api/token/refresh/", {
                refresh: refreshToken
            })
            // if call was successful, store access token from response in local storage and set authorization to true else set it to false
            if (res.status === 200) {
                localStorage.setItem(ACCESS_TOKEN, res.data.access)
                setIsAuthorized(true)
            } else {
                setIsAuthorized(false)
            }
        } catch (error) {
            console.log(error)
            setIsAuthorized(false)
        }
    }

    // auth function to check if token needs to be refreshed
    const auth = async () => {
        // check to see if we have an access token that has not expired or automatically refresh if else
        const token = localStorage.getItem(ACCESS_TOKEN)
        if (!token) {
            setIsAuthorized(false)
            return
        }

        // decode token to get expiration time
        const decoded = jwtDecode(token)
        const tokenExpiration = decoded.exp
        const now = Date.now() / 1000

        // check if expired then refresh or set authorization to true
        if (tokenExpiration < now) {
            await refreshToken()
        } else{
            setIsAuthorized(true)
        }
    }

    // until state is not null, render this div 
    if (isAuthorized === null) {
        return <div>Loading...</div>
    }

    // return children if authorized or navigate to login page
    return isAuthorized ? children : <Navigate to="/login" />
}

export default ProtectedRouter