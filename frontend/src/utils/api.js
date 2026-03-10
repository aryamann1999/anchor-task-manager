const BASE_URL = import.meta.env.VITE_API_URL
const getToken = () => localStorage.getItem('token')
const api = {
    get: (endpoint) =>{
        return fetch(`${BASE_URL}${endpoint}`,{
            headers:{
                'Authorization':`Bearer ${getToken()}`
            }
        })
    },
    post:(endpoint, body) => {
        return fetch(`${BASE_URL}${endpoint}`,{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
                'Authorization':`Bearer ${getToken()}`
            },
            body:JSON.stringify(body)
        })
    },
    delete:(endpoint) => {
        return fetch(`${BASE_URL}${endpoint}`,{
            method:'DELETE',
            headers:{
                'Authorization':`Bearer ${getToken()}`
            }
        })
    },
    patch:(endpoint,body) => {
        return fetch(`${BASE_URL}${endpoint}`,{
            method:'PATCH',
            headers:{
                'Content-Type':'application/json',
                'Authorization':`Bearer ${getToken()}`
            },
            body:JSON.stringify(body)
        })
    }
}
export default api