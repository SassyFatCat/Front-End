import axios from 'axios'; 

export function axiosWithAuth() {
    const token = localStorage.getItem("token"); 

    return axios.create({
        baseURL: "", 
        headers: {
            Authorization: `${token}`
        }
   });
}; 