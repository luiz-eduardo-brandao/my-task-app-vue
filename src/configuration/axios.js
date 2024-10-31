import axios from 'axios'

const HTTPClient = axios.create({
    baseURL: 'http://localhost:5203/api/',
    headers: {
        'Content-Type': 'application/json'
    }
})

// Add token to each request if exists
HTTPClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token')
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }

        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

export default HTTPClient