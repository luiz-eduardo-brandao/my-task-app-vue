<template>
    <div class="h-full">
        <div class="d-flex">
            <h1 class="font-weight-light">{{ staticTitle }}</h1>
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

        <div class="d-flex flex-column">
            <v-row>
                <v-col cols="12" md="6">
                    <v-text-field 
                        v-model="task.title"
                        label="Título" 
                        placeholder="Digite o nome de usuário..."
                    ></v-text-field>
                </v-col>    
            </v-row>
            <v-row>
                <v-col cols="12" md="6">
                    <v-text-field 
                        v-model="task.projectTitle"
                        label="Projeto" 
                        readonly
                    ></v-text-field>
                    <!-- <v-select
                    class="mr-3"
                    label="Projeto"
                    variant="outlined"
                    :items="[
                        'Usuário 1', 
                        'Usuário 2', 
                        'Usuário 3'
                    ]"
                    ></v-select> -->
                </v-col>    
            </v-row>
            <!-- <v-row>
                <v-col cols="12" md="6">
                    <v-text-field 
                        model-value="Eduardo"
                        label="Autor" 
                        placeholder="Digite o nome de usuário..."
                        readonly
                    ></v-text-field>
                </v-col>    
            </v-row> -->
            <v-row>
                <v-col cols="12" md="6">
                    <v-textarea
                    label="Descrição"
                    v-model="task.description"
                    name="input-7-1"
                    variant="filled"
                    auto-grow
                    ></v-textarea>
                </v-col>
            </v-row>

            <v-row>
                <v-col cols="12" md="3">
                    <v-text-field 
                        v-model="task.createdAt"
                        label="Data Criação" 
                        readonly
                    ></v-text-field>
                </v-col>
            </v-row>

            <v-row>
                <v-col cols="12" md="3">
                    <v-text-field 
                        v-model="task.startedAt"
                        label="Data Início" 
                        readonly
                    ></v-text-field>
                </v-col>
                <v-col cols="12" md="3">
                    <v-text-field 
                        v-model="task.startedAt"
                        label="Data Fim" 
                        readonly=""
                    ></v-text-field>
                </v-col>
            </v-row>

            <v-row class="mt-10 mb-10">
                <v-col>
                    <v-btn 
                        class="mr-4"
                        variant="tonal" 
                        color="primary"
                        :loading="updateLoading"
                        size="large"
                        :disabled="deleteLoading"
                        @click="update"
                    >Salvar Alterações</v-btn>
                    <v-btn 
                        variant="tonal" 
                        color="red"
                        :loading="deleteLoading"
                        size="large"
                        :disabled="saveLoading"
                        @click="deleteTask"
                    >Excluir</v-btn>
                </v-col>
            </v-row>
            
        </div>

    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue' 
import taskService from '@/services/taskService'

import { useTaskStore } from '@/stores/TaskStore'

import { useRouter } from 'vue-router'
const router = useRouter()
const callRoute = (routeName) => router.push(routeName)

import { useSnackBarStore } from '@/stores/SnackBarStore'
const snackStore = useSnackBarStore()

let task = ref(
{
    id: null,
    title: '',
    description: '',
    idUser: '',
    idProject: '',
    projectTitle: '',
    createdAt: '',
    startedAt: '',
    finishedAt: '',
})

let staticTitle = ref('')

onMounted(() => {
    task.value = {
        id: null,
        title: '',
        description: '',
        idUser: '',
        idProject: '',
        projectTitle: '',
        createdAt: '',
        startedAt: '',
        finishedAt: '',
    }

    const taskStore = useTaskStore()
    var result = taskStore.getTaskSelected()

    if (result == null) {
        callRoute('/tasks')
    }

    task.value = taskStore.getTaskSelected()
    staticTitle.value = task.value.title
})

let updateLoading = ref(false)
let deleteLoading = ref(false)

const update = async () => {
    updateLoading.value = true

    let updateTaskInputModel = {
        id: task.value.id,
        title: task.value.title,
        description: task.value.description,
    }

    console.log('updateTaskInputModel:', updateTaskInputModel)

    try {
        var response = await taskService.update(updateTaskInputModel)

        snackStore.setSnackBar({
            time: 5000,
            color: 'green-darken-3',
            message: 'Tarefa alterada com sucesso!'
        })

        updateLoading.value = false
    } catch (error) {
        snackStore.setSnackBar({
            time: 5000,
            color: 'red-darken-3',
            message: error
        })

        updateLoading.value = false
    }
}

const deleteTask = async () => {
    deleteLoading.value = true

    try {
        var response = await taskService.delete(task.value.id)

        snackStore.setSnackBar({
            time: 5000,
            color: 'green-darken-3',
            message: 'Tarefa excluída com sucesso'
        })

        callRoute('/tasks')

        deleteLoading.value = false
    } catch (error) {
        snackStore.setSnackBar({
            time: 5000,
            color: 'red-darken-3',
            message: error
        })

        deleteLoading.value = false
    }
}
</script>