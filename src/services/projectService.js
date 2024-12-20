import HTTPClient from '@/configuration/axios'

export default {
    getAllByUserId: async idUser => {
        const { data } = await HTTPClient.get('/projects/user/' + idUser)
        return data
    },
    create: async payload => {
        const { data } = await HTTPClient.post('/projects', payload)
        return data
    },
    update: async payload => {
        const { data } = await HTTPClient.put('/projects', payload)
        return data
    },
    delete: async id => {
        const { data } = await HTTPClient.delete('/projects/' + id)
        return data
    },
}