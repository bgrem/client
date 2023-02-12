import { baseUrl } from './constants';
import axios from "axios"


export const isLoggedIn = async () => {
    const jwtToken = localStorage.getItem("jwtToken")
    try {
        const response = await axios.get(baseUrl + "/auth/check", { headers: { "Authorization": jwtToken } })
        console.log(response)
        return true
    } catch {
        return false
    }
}
export const isAdmin = async () => {
    const jwtToken = localStorage.getItem("jwtToken")
    try {
        const response = await axios.get(baseUrl + "/auth/check_admin", { headers: { "Authorization": jwtToken } })
        console.log(response)
        return true
    } catch {
        return false
    }
}