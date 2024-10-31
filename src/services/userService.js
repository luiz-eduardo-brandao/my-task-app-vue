import HTTPClient from '@/configuration/axios'

export default {
    login: async payload => {
        const { data } = await HTTPClient.put('/users/login', payload)
        return data
    },
    verifyToken: async payload => {
        const { data } = await HTTPClient.put('/users/verifyToken', payload)
        return data
    },
    getById: async id => {
        const { data } = await HTTPClient.get('/users/' + id)
        return data
    },
}