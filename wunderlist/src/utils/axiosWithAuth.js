import axios from 'axios'; 

export const loginWithAuth = axios.create({
    baseURL: "http://wonderlist-backend.herokuapp.com", 
    headers: {
        Authorization: localStorage.getItem('token')
    }
}); 

export const axiosWithAuth = axios.create({
    baseURL: 'https://5f46d272aaaf9a0016151242.mockapi.io/api/'
})