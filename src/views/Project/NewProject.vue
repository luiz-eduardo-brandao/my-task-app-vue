<template>
    <div class="h-screen">
        <div class="d-flex">
            <h1 class="font-weight-light">Crie seu projeto!</h1>
            <v-spacer></v-spacer>
            <v-btn 
                class="mr-4"
                variant="tonal" 
                color="secondary"
                icon="mdi-keyboard-backspace"
                to="/projects"
            ></v-btn>
        </div>
        <v-divider class="mt-2 mb-10"></v-divider>

        <div class="d-flex flex-column">
            <v-form
                v-model="form" 
                @submit.prevent="submit"
            >
                <v-row>
                    <v-col cols="12" md="6">
                        <v-text-field 
                            label="Título" 
                            placeholder="Digite o nome de usuário"
                            v-model="title"
                            :rules="requiredFieldRules"
                        ></v-text-field>
                    </v-col>    
                </v-row>
                <v-row>
                    <v-col cols="12" md="6">
                        <v-textarea
                        label="Descrição"
                        name="input-7-1"
                        variant="filled"
                        auto-grow
                        v-model="description"
                        :rules="requiredFieldRules"
                        ></v-textarea>
                    </v-col>
                </v-row>

                <v-row>
                    <v-col cols="12" md="6">
                        <v-text-field 
                            label="Imagem" 
                            placeholder="Digite a Url da imagem"
                            v-model="imageUrl"
                            :rules="requiredFieldRules"
                        ></v-text-field>
                    </v-col>    
                </v-row>

                <v-row>
                    <v-col cols="6" md="3">
                        <v-select
                            class="mr-3"
                            label="Dificuldade"
                            variant="outlined"
                            :items="projectLevelEnum"
                            v-model="level"
                            :rules="requiredFieldRules"
                        ></v-select>
                    </v-col>
                </v-row>

                <!-- <v-row>
                    <v-col cols="12" md="6">
                        <v-select
                            v-model="colaborators"
                            :items="users"
                            :item-props="itemProps"
                            hint="Escolha os colaboradores para esse projeto"
                            label="Colaboradores"
                            chips
                            multiple
                            clearable
                            persistent-hint
                            variant="solo-filled"
                        ></v-select>
                    </v-col>
                </v-row> -->

                <v-row class="mt-10">
                    <v-col>
                        <v-btn 
                            type="submit"
                            class="mr-4"
                            variant="tonal" 
                            color="primary"
                            :loading="loading"
                            size="large"
                        >Criar Projeto</v-btn>
                    </v-col>
                </v-row>
            </v-form>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import projectService from '@/services/projectService'

import { useRouter } from 'vue-router'

const router = useRouter()
const callRoute = (routeName) => router.push(routeName)

import { useSnackBarStore } from '@/stores/SnackBarStore'
const snackStore = useSnackBarStore()

let form = ref(false)
let title = ref(null)
let description = ref(null)
let imageUrl = ref(null)
let level = ref(null)

let loading = ref(false)

const submit = async () => {
    if (!form.value) return
    
    if (!title.value || title.value == '') return
    if (!description.value || description.value == '') return
    if (!imageUrl.value || imageUrl.value == '') return
    if (!level.value || level.value == 0) return

    
    loading.value = true

    try {
        let createProjectInputModel = {
            title: title.value,
            description: description.value,
            imageUrl: imageUrl.value,
            level: level.value,
            idUser: 2
        }

        var response = await projectService.create(createProjectInputModel)

        snackStore.setSnackBar({
            time: 5000,
            color: 'green-darken-3',
            message: 'Projeto criado com sucesso!'
        })

        loading.value = false 

        callRoute('/projects')  
    } catch (error) {
        snackStore.setSnackBar({
            time: 5000,
            color: 'red-darken-3',
            message: error
        })

        loading.value = false 
    }
}

const projectLevelEnum = ref([
    { title: 'Fácil', value: 1 },
    { title: 'Médio', value: 2 },
    { title: 'Difícil', value: 3 },
    { title: 'Urgente', value: 4 },
])

const requiredFieldRules = ref([
    value => {
        if (value) return true

        return 'Campo obrigatório'
    }
])

let colaborators = ref([])
let users = ref([
        { id: 1, nome: 'Eduardo', email: 'oi@gmail.com'},
        { id: 2, nome: 'Rafael', email: 'oi@gmail.com'},
        { id: 3, nome: 'Pedro', email: 'oi@gmail.com'},
        { id: 4, nome: 'Jorge', email: 'oi@gmail.com'},
    ])

const itemProps = (item) => {
    return {
        title: item.nome,
        subtitle: item.email,
    }
}

</script>