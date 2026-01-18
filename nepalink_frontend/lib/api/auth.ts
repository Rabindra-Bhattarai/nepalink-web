// Actual backend API calls
import axios from './axios'; // IMPORTANT: axios instance with base URL
import { API } from './endpoints';

export const register = async(registerData: any) => {
    try{
        const response = await axios.post(API.AUTH.REGISTER, registerData);
        return response.data; // response ko body(what backend returns)
    }catch(err: Error | any){
        // if 4xx/5xx error, axios throws error
        throw new Error(
            err.response?.data?.message  // backend error message
            || err.message // general axios error message
            || "Registration failed" // fallback message
        )
    }
}

export const login = async(loginData: any) => {
    try{
        const response = await axios.post(API.AUTH.LOGIN, loginData);
        return response.data; // response ko body(what backend returns)
    }catch(err: Error | any){
        // if 4xx/5xx error, axios throws error
        throw new Error(
            err.response?.data?.message  // backend error message
            || err.message // general axios error message
            || "Login failed" // fallback message
        )
    }
}