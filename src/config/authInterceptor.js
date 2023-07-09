import axios from 'axios'

const authInstance = axios.create({
    baseURL:'http://134.209.229.112:8080/'
})

authInstance.interceptors.request.use((config)=>{
    return config
})

export default authInstance