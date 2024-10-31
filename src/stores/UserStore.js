import { ref } from 'vue'
import { defineStore } from 'pinia'
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

    const checkUser = async () => { 
        if (localStorage.getItem('idUser')) {
            let idUser = localStorage.getItem('idUser')
            let token = localStorage.getItem('token')
            let refreshToken = localStorage.getItem('refreshToken')

            let verifyTokenModel = {
                idUser,
                token : token ? token : '',
                refreshToken: refreshToken ? refreshToken : ''
            }

            try {
                var response = await userService.verifyToken(verifyTokenModel)

                if (response.token) {
                    localStorage.setItem('token', response.token)
                }

                if (response.refreshToken) {
                    localStorage.setItem('refreshToken', response.refreshToken)
                }

                return true
            } catch (error) {
                return false
            }
        }

        return false
    }

    async function login(loginRequest, isPermanent) {
        var user = await userService.login(loginRequest)

        user.isPermanent = isPermanent,
        user.image = '@/assets/user-edu.jpg' 

        if (user.isPermanent) {
            // localStorage.setItem('user', JSON.stringify(user.value))

            localStorage.setItem('idUser', user.id)
            localStorage.setItem('token', user.token)
            localStorage.setItem('refreshToken', user.refreshToken)
        }

        setUser(user)

        return user
    } 

    const logout = () => {
        user.value = null
        isAuthenticated.value = false

        localStorage.removeItem('idUser')
        localStorage.removeItem('token')
        localStorage.removeItem('refreshToken')
    }   

    async function loadUserData() {
        if (localStorage.getItem('idUser')) {
            try {
                let idUser = localStorage.getItem('idUser')
        
                var user = await userService.getById(idUser)
        
                user.isPermanent = true
                
                setUser(user)    
            } catch (error) {
                
            }
        }
    }

    const setIsAuth = (auth) => isAuthenticated.value = auth

    const setUser = (newUser) => {
        if (newUser == null)
            throw 'Usuário inválido'

        user.value = newUser

        setIsAuth(true)
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
        checkUser,
        login,
        loadUserData
    }
})