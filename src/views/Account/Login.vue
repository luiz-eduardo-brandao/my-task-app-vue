<template>
    <v-row justify="center" class=" h-75">
        <v-col
            align-self="center"
            cols="12"
            md="3"
            class="mt-5"
        >
            <div class="d-flex justify-center">
                <h1 class="font-weight-light d-flex">
                    <v-img
                        class="mr-3 mt-3"
                        height="20"
                        width="20"
                        src="../../assets/logo-task.png"
                    ></v-img>
                    MyTask - App
                </h1>
            </div>
        </v-col>
        <v-col
            align-self="center"
            cols="12"
            md="6"
            class="mt-5"
        >                
            <div class="d-flex justify-center">
                <v-card width="700" class="pa-5 rounded-md border">
                    <v-row justify="center">
                        <v-card-title>Faça Login!</v-card-title>
                    </v-row>
            
                    <v-form
                        v-model="form" 
                        @submit.prevent="login">
                        <v-card-text class="mt-4">
                            <v-text-field 
                                v-model="email"
                                label="Email" 
                                :rules="usernameRules"
                            ></v-text-field>
            
                            <v-text-field
                                v-model="password"
                                class="mt-3" 
                                label="Senha" 
                                type="password"
                                :rules="passwordRules"
                            ></v-text-field>

                            <v-row justify="center">
                                <v-checkbox 
                                    v-model="isPermanent"
                                    label="Permanecer Conectado?"
                                ></v-checkbox>
                            </v-row>
                        </v-card-text>
            
                        <v-row justify="center" class="my-6">
                            <span>Não possui uma conta?</span>
                            <a class="ml-2" href="/registerAccount">Criar conta</a>
                        </v-row>
                        
                        <!-- <v-row justify="center" class="my-6">
                            <a href="/registerAccount">Esqueceu a senha?</a>
                        </v-row> -->

                        <v-divider class="mb-5"></v-divider>
                
                        <v-card-actions>
                            <v-row justify="center" class="mx-4">
                                <v-btn 
                                    type="submit"
                                    variant="tonal" 
                                    size="large"
                                    block 
                                    color="warning"
                                    :loading="loginLoading"
                                >Login</v-btn>
                            </v-row>
                        </v-card-actions>
                    </v-form>
                </v-card>
            </div>
        </v-col>
    </v-row>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

import { useSnackBarStore } from '@/stores/SnackBarStore'
import { useUserStore } from '../../stores/UserStore'
import { useProjectStore } from '@/stores/ProjectStore'
import { useTaskStore } from '@/stores/TaskStore'

const snackStore = useSnackBarStore()

const usernameRules = ref([
    value => {
        if (value) return true

        return 'Campo obrigatório'
    }
])

const passwordRules = ref([
    value => {
        if (value) return true

        return 'Campo obrigatório'
    },
    value => {
        if (value?.length < 3) return 'Senha inválida'

        return true
    }
])

let form = ref(false)
let email = ref(null)
let password = ref(null)
let isPermanent = ref(false)

const router = useRouter()
const callRoute = (routeName) => router.push(routeName)

const userStore = useUserStore()
const projectStore = useProjectStore()

let loginLoading = ref(false)

const login = async () => {    
    if (!form) return
    
    if (!email.value || email.value == '') return
    if (!password.value || password.value == '') return

    loginLoading.value = true

    try {
        // if ( email.value != 'edu' || password.value != '123')
        //     throw 'Usuário ou senha incorretos'

        let loginRequest = {
            email: email.value,
            password: password.value
        }

        var user = await userStore.login(loginRequest, isPermanent.value)

        if (user) {
            projectStore.loadProjectData()

            callRoute('/')  
            
            loginLoading.value = false 
        } else {
            throw 'Usuário ou senha incorretos'
        }

        // let user = {
        //     id: 1,
        //     nome: 'Edu',
        //     email: 'edu@gmail.com',
        //     role: 'Admin',
        //     accessToken: 'dfauwhdu12bn1u2bn12hn1ij21inm2i1n',
        //     isPermanent: isPermanent.value,
        //     image: '@/assets/user-edu.jpg'
        // }
    } catch (error) {
        console.log('error: ', error)

        snackStore.setSnackBar({
            time: 5000,
            color: 'red-darken-3',
            message: error.response.data
        })

        loginLoading.value = false 
    }
}


</script>