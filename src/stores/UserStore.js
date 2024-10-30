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
        try {
            if (localStorage.getItem('idUser')) {
                const token = 'Bearer ' + localStorage.getItem('token')
                // await userService.verifyToken(token)
    
                return true;
            }

            return false

        } catch (error) {
            throw error;
        }
    }

    async function login(loginRequest, isPermanent) {
        var user = await userService.login(loginRequest)

        user.isPermanent = isPermanent,
        user.image = '@/assets/user-edu.jpg' 

        if (user.isPermanent) {
            // localStorage.setItem('user', JSON.stringify(user.value))
            // setToken(user.value.token)

            localStorage.setItem('idUser', user.id)
            localStorage.setItem('token', user.token)
        }

        console.log('setUser: ',user)

        setUser(user)

        return user
    } 

    const logout = () => {
        user.value = null
        isAuthenticated.value = false

        localStorage.removeItem('token')
        localStorage.removeItem('idUser')
    }   

    async function loadUserData() {
        console.log('loadTaskData')

        if (localStorage.getItem('idUser')) {
            let idUser = localStorage.getItem('idUser')
    
            var user = await userService.getById(idUser)
    
            user.isPermanent = true
            console.log('setUser: ',user)
            
            setUser(user)
        }
    }

    const setIsAuth = (auth) => isAuthenticated.value = auth

    const setUser = (newUser) => {
        console.log('aqui ?')

        if (newUser == null) throw 'Usuário inválido'

        console.log(newUser)

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