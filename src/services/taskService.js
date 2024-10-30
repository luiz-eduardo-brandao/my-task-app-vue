import HTTPClient from '@/configuration/axios'

export default {
    getAllByUserId: async idUser => {
        let token = localStorage.getItem('token')

        console.log('token: ', token)

        const { data } = await HTTPClient.get('/tasks/user/' + idUser, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        })
        return data
    },
    create: async payload => {
        let token = localStorage.getItem('token')

        const { data } = await HTTPClient.post('/tasks', payload, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        })
        return data
    },
    update: async payload => {
        let token = localStorage.getItem('token')

        const { data } = await HTTPClient.put('/tasks', payload, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        })

        return data
    },
    delete: async id => {
        let token = localStorage.getItem('token')

        const { data } = await HTTPClient.delete('/tasks/' + id, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        })
        
        return data
    },
    start: async id => {
        let token = localStorage.getItem('token')

        const { data } = await HTTPClient.put('/tasks/start/' + id, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        })
        
        return data
    },
    finish: async id => {
        let token = localStorage.getItem('token')

        const { data } = await HTTPClient.put('/tasks/finish/' + id, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        })
        
        return data
    },
}