<template>
    <div class="h-full">
        <div class="d-flex">
            <h1 class="font-weight-light">{{ staticTitle }}</h1>
            <v-spacer></v-spacer>
            <v-btn 
                class="mr-4"
                variant="tonal" 
                color="warning"
                icon="mdi-keyboard-backspace"
                to="/projects"
            ></v-btn>
        </div>
        <v-divider class="mt-2 mb-10"></v-divider>

        <div class="d-flex flex-column">
            <v-row>
                <v-col cols="12" md="6">
                    <v-text-field 
                        v-model="project.title"
                        label="Título" 
                        placeholder="Digite o nome de usuário..."
                    ></v-text-field>
                </v-col>    
            </v-row>
            <v-row>
                <v-col cols="12" md="6">
                    <v-textarea
                    label="Descrição"
                    v-model="project.description"
                    name="input-7-1"
                    variant="filled"
                    auto-grow
                    ></v-textarea>
                </v-col>
            </v-row>

            <v-row>
                <v-col cols="6" md="3">
                    <v-select
                    class="mr-3"
                    label="Dificuldade"
                    variant="outlined"
                    v-model="project.level"
                    :items="['Fácil', 'Médio', 'Difícil']"
                ></v-select>
                </v-col>
                <v-col cols="12" md="3">
                    <v-text-field 
                        :model-value="project.createdAt"
                        label="Data Criação" 
                        placeholder="Digite o nome de usuário..."
                        readonly
                    ></v-text-field>
                </v-col>
            </v-row>

            <v-row class="mt-8">
                <v-col cols="12" md="6">
                    <h3 class="font-weight-light mb-3">Tarefas:</h3>
                    <v-card v-if="project.tasks == 0"
                        class="w-100 py-8 text-center"
                    >
                        <p>
                        Você ainda não possui tarefas. Crie agora!
                        </p>
                    </v-card>
                    <v-table v-else>
                        <thead>
                            <tr>
                                <th v-for="header in taskListHeader" :key="header.key">
                                    {{ header.title }}
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr 
                                class="cursor-pointer table-line"
                                v-ripple
                                v-for="item in project.tasks"
                                :key="item.id"
                            >
                                <td>{{ item.id }}</td>
                                <td>{{ item.title }}</td>
                                <td>{{ item.timeConsumed }}</td>
                                <td>{{ item.startDate }}</td>
                                <td>{{ item.endDate }}</td>
                            </tr>
                        </tbody>
                    </v-table>
                </v-col>
            </v-row>

            <v-row class="mt-10">
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
                        @click="deleteProject"
                    >Excluir</v-btn>
                </v-col>
            </v-row>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue' 
import { useRouter } from 'vue-router'
import { useProjectStore } from '@/stores/ProjectStore'

import projectService from '@/services/projectService'

import { useSnackBarStore } from '@/stores/SnackBarStore'
const snackStore = useSnackBarStore()

const router = useRouter()

const callRoute = (routeName) => {
  router.push(routeName)
  window.scrollTo(0, 0);
}

let project = ref({
    id: null,
    title: '',
    description: '',
    userName: '',
    createdAt: '',
    image: '',
    level: null, 
    descLevel: ''
})

let staticTitle = ref('')

onMounted(() => {
    project.value = {
        id: null,
        title: '',
        description: '',
        userName: '',
        createdAt: '',
        image: '',
        level: null, 
        descLevel: ''
    }

    const projectStore = useProjectStore()
    var result = projectStore.getProjectSelected()

    if (result == null) {
        callRoute('/projects')
    }

    project.value = projectStore.getProjectSelected()
    staticTitle.value = project.value.title
})

let updateLoading = ref(false)
let deleteLoading = ref(false)

let taskListHeader = ref([
    {
    align: 'start',
    key: 'id',
    title: 'Id',
    },
    { key: 'title', title: 'Tarefa' },
    { key: 'timeConsumed', title: 'Tempo Gasto' },
    { key: 'startDate', title: 'Início' },
    { key: 'endDate', title: 'Fim' },
])

const update = async () => {
    updateLoading.value = true

    let updateProjectInputModel = {
        id: project.value.id,
        title: project.value.title,
        description: project.value.description,
        level: project.value.level,
    }

    console.log('updateProjectInputModel:', updateProjectInputModel)

    try {
        var response = await projectService.update(updateProjectInputModel)

        snackStore.setSnackBar({
            time: 5000,
            color: 'green-darken-3',
            message: 'Projeto alterado com sucesso!'
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

const deleteProject = async () => {
    deleteLoading.value = true

    console.log('selected project:', project.value.id)

    try {
        var response = await projectService.delete(project.value.id)

        snackStore.setSnackBar({
            time: 5000,
            color: 'green-darken-3',
            message: 'Projeto excluído com sucesso'
        })

        callRoute('/projects')

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