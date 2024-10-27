<template>
    <div class="h-screen">
        <h1 class="font-weight-light">Projetos</h1>
        
        <v-divider class="my-6"></v-divider>

        <TimeLine 
            :isTimelineOpen="isTimelineOpen"
            :projectTimeline="projectTimeline"
            @close="closeTimeline()"   
        />

        <FormProject 
            :isOpen="isFormProjectOpen"
            :label="labelFormProject"
            @close="isFormProjectOpen = !isFormProjectOpen"
        />

        <v-card>
            <v-row class="d-flex justify-space-between pa-4">
                <v-card-title>Lista de Projetos</v-card-title>
                <v-card-title>
                    <v-btn 
                        to="/new-project"
                        variant="tonal" 
                        color="secondary"
                    >Criar Projeto</v-btn>
                </v-card-title>
            </v-row>
    
            <v-card-text>
                <v-table>
                    <thead>
                        <tr>
                            <th v-for="header in headers" :key="header.key">
                                {{ header.title }}
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr 
                            class="cursor-pointer table-line"
                            v-ripple
                            v-for="item in projects"
                            :key="item.id"
                            @click="openEditProject(item)"
                        >
                            <td>{{ item.id }}</td>
                            <td>{{ item.title }}</td>
                            <td>{{ item.userName }}</td>
                            <td>{{ item.createdAt }}</td>
                            <td>
                                <v-rating
                                :model-value="item.level"
                                color="orange-darken-2"
                                density="compact"
                                size="small"
                                readonly
                                ></v-rating>
                            </td>
                            <td>
                                <v-btn 
                                variant="tonal" 
                                color="primary"
                                @click.stop="callRoute('/tasks')"
                                >Tarefas</v-btn>
                            </td>
                            <td>
                                <v-btn 
                                icon="mdi-history"
                                color="primary"
                                class="rounded-7 ma-2"
                                variant="text"
                                @click.stop="openTimeline(item)"
                                ></v-btn>
                            </td>
                        </tr>
                    </tbody>
                </v-table>
            </v-card-text>
        </v-card>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue' 
import { useRouter } from 'vue-router'
import { useProjectStore } from '@/stores/ProjectStore'

import TimeLine from '@/components/TimeLine.vue'
import FormProject from '@/components/project/FormProject.vue'

const projectStore = useProjectStore()

let projects = computed(() => {
    var oi = projectStore.getProjectsList()
    console.log('projects oi: ', oi)

    return projectStore.getProjectsList()
})

const router = useRouter()

const callRoute = (routeName) => {
  router.push(routeName)
  window.scrollTo(0, 0);
}

let isTimelineOpen = ref(false)
let projectTimeline = ref([])

let isFormProjectOpen = ref(false)
let labelFormProject = ref('')

const openEditProject = (project) => {
    console.log('openEditProject', project)

    projectStore.setProjectSelected(project)

    callRoute('/project')
}

const openProjectForm = (label, project) => {

    labelFormProject.value = label

    if (project != null) {

    }

    isFormProjectOpen.value = !isFormProjectOpen.value
}

const openTimeline = (project) => {
    console.log('get project timeline by id: ', project.id)

    projectTimeline.value = [
        {
            id: 1,
            projectId: project.id,
            date: '20/09/2024',
            hour: '10:00',
            action: 'Inclusão',
            title: project.title
        },
        {
            id: 2,
            projectId: project.id,
            date: '21/09/2024',
            hour: '9:22',
            action: 'Alteração',
            title: project.title
        },
    ]

    isTimelineOpen.value = !isTimelineOpen.value
}

const closeTimeline = () => {
    isTimelineOpen.value = !isTimelineOpen.value

    projectTimeline.value = []
}

let projects2 = ref([
    {
        id: 1,
        title: 'Projeto Planejamento - AR23',
        description: 'Projeto Validações AR - 2024 - Outubro',
        userName: 'Eduardo',
        createdAt: '26/09/2024 9:40 PM',
        level: 2 
    },
    {
        id: 2,
        title: 'Projeto Desenvolvimento - AR23',
        description: 'Projeto Validações AR - 2024 - Outubro',
        userName: 'Eduardo',
        createdAt: '26/09/2024 9:40 PM',
        level: 4
    },
    {
        id: 3,
        title: 'Projeto Validações - AR23',
        description: 'Projeto Validações AR - 2024 - Outubro',
        userName: 'Eduardo',
        createdAt: '26/09/2024 9:40 PM',
        level: 3 
    },
])

let headers = ref([
        {
        align: 'start',
        key: 'id',
        title: 'Id',
        },
        { key: 'title', title: 'Título' },
        { key: 'userName', title: 'Usuário' },
        { key: 'createdAt', title: 'Data Criação' },
        { key: 'level', title: 'Dificuldade' },
        { key: 'tasks', },
        { key: 'actions' }
    ])

</script>

<style>

.table-line:hover {
    background-color: #424242;
}

</style>