import { defineStore } from 'pinia'
import { ref } from 'vue'
import userService from '@/services/userService'

export const useUserStore = defineStore('user', () => {
    let user = ref(null)
    let isAuthenticated = ref(false)

    let listaUsuarios = ref([
        {
            id: 1,
            nome: 'Edu',
            email: 'edu@gmail.com',
            role: 'Admin'
        },
        {
            id: 2,
            nome: 'Carlos',
            email: 'carlos@gmail.com',
            role: 'Gerente'
        },
        {
            id: 3,
            nome: 'Alex',
            email: 'alex@gmail.com',
            role: 'Convidado'
        },
        {
            id: 4,
            nome: 'Ferreira',
            email: 'ferreira@gmail.com',
            role: 'Convidado'
        }
    ])

    let listaUsuariosHeader = ref([
        {
        align: 'start',
        key: 'id',
        title: 'Id',
        },
        { key: 'nome', title: 'Nome' },
        { key: 'email', title: 'Email' },
        { key: 'role', title: 'Cargo' },
        { key: 'actions', }
    ])

    const setIsAuth = (auth) => isAuthenticated.value = auth

    const setUser = (newUser) => {
        if (newUser == null) throw 'Usuário inválido'

        console.log(newUser)

        user.value = newUser

        setIsAuth(true)

        if (user.value.isPermanent) {
            localStorage.setItem('user', JSON.stringify(user.value))
            setToken(user.value.accessToken)
        }
    }   

    const setToken = (tokenValue) => {
        localStorage.setItem('token', tokenValue)
    }

    const checkToken = async () => { 
        console.log('checkToken request', localStorage.getItem('token'))

        try {
            const token = 'Bearer ' + localStorage.getItem('token')
            // return await userService.verifyToken(token)

            return true;
        } catch (error) {
            throw error;
        }
    }

    const logout = () => {
        user.value = null
        isAuthenticated.value = false
        localStorage.removeItem('token')
        localStorage.removeItem('user')
    }   

    const getListaUsuarios = () => listaUsuarios.value
    const getListaUsuariosHeader = () => listaUsuariosHeader.value
    const getUser = () => user.value
    const getIsAuthenticated = () => isAuthenticated.value

    return {
        getListaUsuarios,
        getListaUsuariosHeader,
        getUser,
        getIsAuthenticated,
        setUser,
        setIsAuth,
        logout,
        checkToken
    }
})