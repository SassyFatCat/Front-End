import axios from 'axios'; 

// export function axiosWithAuth() {
//     const token = localStorage.getItem("token"); 

//     return axios.create({
//         baseURL: "https://reqres.in", 
//         // headers: {
//         //     Authorization: `${token}`
//         // }
//    });
// }; 

export const axiosWithAuth = axios.create({
    baseURL: " http://wonderlist-backend.herokuapp.com", 
    headers: {
        Authorization: localStorage.getItem('token')
    }
}); 