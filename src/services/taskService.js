import HTTPClient from '@/configuration/axios'

export default {
    getAllByUserId: async idUser => {
        const { data } = await HTTPClient.get('/tasks/user/' + idUser)
        return data
    },
    create: async payload => {
        const { data } = await HTTPClient.post('/tasks', payload)
        return data
    },
    update: async payload => {
        const { data } = await HTTPClient.put('/tasks', payload)
        return data
    },
    delete: async id => {
        const { data } = await HTTPClient.delete('/tasks/' + id)
        return data
    },
    start: async id => {
        const { data } = await HTTPClient.put('/tasks/start/' + id)
        return data
    },
    finish: async id => {
        const { data } = await HTTPClient.put('/tasks/finish/' + id)
        return data
    },
}