import HTTPClient from '@/configuration/axios'

export default {
    login: async payload => {
        const { data } = await HTTPClient.put('/users/login', payload)
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
        let token = localStorage.getItem('token')
        
        const { data } = await HTTPClient.get('/users/' + id, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        })
        return data
    },
    getTasksByUserId: async idUser => {
        let token = localStorage.getItem('token')

        const { data } = await HTTPClient.get('/tasks/user/' + idUser, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        })
        return data
    }
}