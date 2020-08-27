import axios from 'axios'; 

export const loginWithAuth = axios.create({
    baseURL: "https://wunderlist1-bw-backend.herokuapp.com/", 
}); 

export const axiosWithAuth = axios.create({
    baseURL: 'https://5f46d272aaaf9a0016151242.mockapi.io/api/'
})