import HTTPClient from '@/configuration/axios'

export default {
    login: async payload => {
        const { data } = await HTTPClient.post('/users/login', payload)
        return data
    },
    verifyToken: async token => {
        const { data } = await HTTPClient.post('/users/verify', {
            headers: {
                Authorization: token
            }
        })
        
        return data
    },
    getById: async id => {
        const { data } = await HTTPClient.get('/users/' + id)
        return data
    },
    getTasksByUserId: async idUser => {
        const { data } = await HTTPClient.get('/tasks/user/' + idUser)
        return data
    }
}