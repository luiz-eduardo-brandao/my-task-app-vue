import HTTPClient from '@/configuration/axios'

export default {
    getAllByUserId: async idUser => {
        let token = localStorage.getItem('token')

        console.log('token: ', token)

        const { data } = await HTTPClient.get('/projects/user/' + idUser, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        })
        return data
    },
    create: async payload => {
        let token = localStorage.getItem('token')

        const { data } = await HTTPClient.post('/projects', payload, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        })
        return data
    },
    update: async payload => {
        let token = localStorage.getItem('token')

        const { data } = await HTTPClient.put('/projects', payload, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        })

        return data
    },
    delete: async id => {
        let token = localStorage.getItem('token')

        const { data } = await HTTPClient.delete('/projects/' + id, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        })
        
        return data
    },
}