/* eslint-disable no-unused-vars */
// create wrapper for protected route, only requests with access tokens can access this route.

import { Navigate } from "react-router-dom"
import { jwtDecode } from "jwt-decode"
import api from "../api"
import { REFRESH_TOKEN, ACCESS_TOKEN } from "../constants"

// Protected route component