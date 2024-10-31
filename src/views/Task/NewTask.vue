<template>
    <div class="h-screen">
        <div class="d-flex">
            <h1 class="font-weight-light">Escolha o projeto e crie uma tarefa!</h1>
            <v-spacer></v-spacer>
            <v-btn 
                class="mr-4"
                variant="tonal" 
                color="secondary"
                icon="mdi-keyboard-backspace"
                to="/tasks"
            ></v-btn>
        </div>
        <v-divider class="mt-2 mb-10"></v-divider>

        <v-form
            v-model="form" 
            @submit.prevent="submit"
        >
        
            <div class="d-flex flex-column">
                <v-row>
                    <v-col cols="12" md="6">
                        <v-select
                        class="mr-3"
                        label="Projetos"
                        variant="outlined"
                        v-model="projectSelected"
                        :items="projects"
                        :rules="requiredFieldRules"
                        ></v-select>
                    </v-col>
                </v-row>

                <v-row>
                    <v-col cols="12" md="6">
                        <v-text-field 
                            label="Título" 
                            placeholder="Digite o título da sua tarefa"
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

                <!-- <v-row>
                    <v-col cols="12" md="3">
                        <v-text-field 
                            label="Data Ínicio" 
                        ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="3">
                        <v-text-field 
                            label="Data Fim" 
                        ></v-text-field>
                    </v-col>
                </v-row> -->

                <v-row class="mt-10">
                    <v-col>
                        <v-btn 
                            type="submit"
                            class="mr-4"
                            variant="tonal" 
                            color="primary"
                            size="large"
                            :loading="loading"
                        >Criar Tarefa</v-btn>
                    </v-col>
                </v-row>
            </div>
        </v-form>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import taskService from '@/services/taskService'

import { useProjectStore } from '@/stores/ProjectStore'
import { useUserStore } from '@/stores/UserStore'

import { useRouter } from 'vue-router'
const router = useRouter()
const callRoute = (routeName) => router.push(routeName)

const projectStore = useProjectStore()

import { useSnackBarStore } from '@/stores/SnackBarStore'
const snackStore = useSnackBarStore()

let projects = computed(() => {
    let projectsList = projectStore.getProjectsList()

    return projectsList.map(p => {
        return {
            title: p.title,
            value: p.id
        }
    })
})

let form = ref(false)
let title = ref(null)
let description = ref(null)
let loading = ref(false)

let projectSelected = ref(null)

const requiredFieldRules = ref([
    value => {
        if (value) return true

        return 'Campo obrigatório'
    }
])

const submit = async () => {
    if (!form.value) return

    loading.value = true

    try {
        const userStore = useUserStore()
        let user = userStore.getUser()

        let createTaskInputModel = {
            title: title.value,
            description: description.value,
            idUser: user.id,
            idProject: projectSelected.value,
        }

        var response = await taskService.create(createTaskInputModel)

        snackStore.setSnackBar({
            time: 5000,
            color: 'green-darken-3',
            message: 'Tarefa criada com sucesso!'
        })
        
        loading.value = false 

        callRoute('/tasks')  
    } catch (error) {
        snackStore.setSnackBar({
            time: 5000,
            color: 'red-darken-3',
            message: error
        })

        loading.value = false 
    }
}

</script>