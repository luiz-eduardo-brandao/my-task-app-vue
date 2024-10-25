import axios from 'axios'

const HTTPClient = axios.create({
    baseURL: 'http://localhost:5203/api/',
    headers: {
        'Content-Type': 'application/json'
    }
})

export default HTTPClient