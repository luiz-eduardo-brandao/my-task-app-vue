<template>
    <div class="h-full">
        <div class="d-flex">
            <h1 class="font-weight-light">{{ project.title }}</h1>
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
                        :model-value="project.title"
                        label="Título" 
                        placeholder="Digite o nome de usuário..."
                    ></v-text-field>
                </v-col>    
            </v-row>
            <v-row>
                <v-col cols="12" md="6">
                    <v-textarea
                    label="Descrição"
                    :model-value="project.description"
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
                    model-value="Médio"
                    :items="['Fácil', 'Médio', 'Difícil']"
                ></v-select>
                </v-col>
                <v-col cols="12" md="3">
                    <v-text-field 
                        :model-value="project.createdAt"
                        label="Data Criação" 
                        placeholder="Digite o nome de usuário..."
                    ></v-text-field>
                </v-col>
            </v-row>

            <v-row>
                <v-col cols="12" md="6">
                    <div class="d-flex py-2">
                        <h3 class="font-weight-light">Colaboradores:</h3>
                        <v-spacer></v-spacer>
                        <v-btn 
                            variant="tonal" 
                            color="primary"
                            size="small"
                            icon="mdi-plus"
                        ></v-btn>
                    </div>
                    <v-table>
                        <thead>
                            <tr>
                                <th v-for="header in userHeader" :key="header.key">
                                    {{ header.title }}
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr 
                                class="cursor-pointer table-line"
                                v-ripple
                                v-for="item in userList"
                                :key="item.id"
                            >
                                <td>{{ item.nome }}</td>
                                <td>{{ item.email }}</td>
                                <td>
                                    <v-chip 
                                        variant="text" 
                                        size="small"
                                        class="cursor-pointer font-weight-bold"
                                        :color="item.role == 'Admin' ? 'green' : 'grey'"
                                    >
                                        {{ item.role }}
                                    </v-chip>
                                </td>
                            </tr>
                        </tbody>
                    </v-table>
                </v-col>
            </v-row>

            <v-row class="mt-8">
                <v-col cols="12" md="6">
                    <h3 class="font-weight-light">Tarefas:</h3>
                    <v-table>
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
                                v-for="item in taskList"
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
                        :loading="saveLoading"
                        size="large"
                        :disabled="deleteLoading"
                        @click="save"
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
import { ref, computed, onMounted } from 'vue' 
import { useRouter } from 'vue-router'
import { useProjectStore } from '@/stores/ProjectStore'

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

onMounted(() => {
    console.log('onMounted')

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

    console.log('oi: ', project.value)
})

let saveLoading = ref(false)
let deleteLoading = ref(false)

let userList = ref([
    { id: 1, nome: 'Eduardo', email: 'edu@gmail.com', role: 'Admin'},
    { id: 2, nome: 'Jorge', email: 'jorge@gmail.com', role: 'Guest'},
    { id: 3, nome: 'Rafael', email: 'rafael@gmail.com', role: 'Guest'},
])

let userHeader = ref([
    { key: 'nome', title: 'Nome'},
    { key: 'email', title: 'Email'},
    { key: 'role', title: 'Cargo'}
])

let taskList = ref([
    {
        id: 1,
        title: 'Desenvolver rota de login',
        description: 'Phasellus feugiat arcu sapien, et iaculis ipsum elementum sit amet. Mauris cursus commodo interdum. Praesent ut risus eget metus luctus accumsan id ultrices nunc. Sed at orci sed massa consectetur dignissim a sit amet dui.',
        projectId: 1,
        projectTitle: 'Projeto Desenvolvimento - AR23',
        timeConsumed: '01:00',
        startDate: '27/09/2024 03:00',
    },
    {
        id: 2,
        title: 'Desenvolver rota de login',
        description: 'Phasellus feugiat arcu sapien, et iaculis ipsum elementum sit amet. Mauris cursus commodo interdum. Praesent ut risus eget metus luctus accumsan id ultrices nunc. Sed at orci sed massa consectetur dignissim a sit amet dui.',
        projectId: 1,
        projectTitle: 'Projeto Desenvolvimento - AR23',
        timeConsumed: '01:00',
        startDate: '27/09/2024 03:00',
    },
    {
        id: 3,
        title: 'Desenvolver rota de login',
        description: 'Phasellus feugiat arcu sapien, et iaculis ipsum elementum sit amet. Mauris cursus commodo interdum. Praesent ut risus eget metus luctus accumsan id ultrices nunc. Sed at orci sed massa consectetur dignissim a sit amet dui.',
        projectId: 1,
        projectTitle: 'Projeto Desenvolvimento - AR23',
        timeConsumed: '01:00',
        startDate: '27/09/2024 03:00',
    }
])

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

const save = () => {
    saveLoading.value = true

    setTimeout(() => {
        saveLoading.value = false
    }, 2000)
}

const deleteProject = () => {
    deleteLoading.value = true

    setTimeout(() => {
        deleteLoading.value = false
    }, 2000)
}
</script>