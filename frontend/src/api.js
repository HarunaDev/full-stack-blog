/* eslint-disable no-unused-vars */
// write interceptor code to listen for requests and write the correct headers required using axios

import axios from "axios"
import { ACCESS_TOKEN } from "./constants"

// get api
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL //import anything specified inside of an environment variable
})