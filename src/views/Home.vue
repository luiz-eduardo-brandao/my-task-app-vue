<template>
    <div>
        <h1 class="font-weight-light mb-6">
          <span v-if="user">Bem-vindo de volta, {{ user.nome }}!</span>
          <span v-else>Bem-vindo!</span>
        </h1>
        
     
        <div class="d-flex mt-10 mb-2">
          <a href="/projects" class="text-decoration-none">
            <h2 class="font-weight-light ">Projetos recentes:</h2>
          </a>
          <v-spacer></v-spacer>
          <v-btn 
              @click="callRoute('/new-project')"
              variant="tonal" 
              color="secondary"
              append-icon="mdi-plus"
          >Criar Projeto</v-btn>
        </div>
        <v-divider class="mb-10"></v-divider>

        <v-row justify="center" class="mt-6 mb-10">
          <v-slide-group
            class="pa-4"
            center-active
            show-arrows
            max-width="800"
          >
            <v-slide-group-item
              v-for="project in projects" 
              :key="project.id" 
              v-ripple
            >
              <v-card 
                flat 
                v-ripple
                min-width="300"
                class="border cursor-pointer mx-3" 
                @click="openProject(project)"
              >
                <v-img 
                  class="align-end text-white border-rounded"
                  :src="project.image"
                  cover
                  
                  min-width="300"
                  max-height="220"
                  max-width="280"
                >
                  <v-card-title class="bg-black text-overline ext-medium-emphasis
                  text-wrap">{{ project.title }}</v-card-title>
                </v-img>
                
                <v-card-subtitle class="pt-3 text-wrap">
                  <div class="d-flex">
                    {{ project.userName }}
                    <v-spacer></v-spacer>
                    <v-rating
                      :model-value="project.level"
                      color="orange-darken-2"
                      density="compact"
                      size="small"
                      readonly
                    ></v-rating>
                  </div>
                </v-card-subtitle>

                <v-card-text>
                  <div>{{ project.description }}</div>
                </v-card-text>

                <v-card-text class="text-wrap">
                </v-card-text>

                <v-card-actions>
                  <v-btn 
                    variant="outlined" 
                    color="primary"
                    @click.stop="openProject(project)"
                  >Editar</v-btn>
                  <v-btn 
                    append-icon="mdi-calendar-check" 
                    variant="tonal" 
                    color="blue"
                    @click.stop="callRoute('/tasks')"
                  >Tarefas</v-btn>
                </v-card-actions>
              </v-card>
            </v-slide-group-item>
          </v-slide-group>

          <!-- <v-col 
            v-for="project in recentProjects" :key="project.id" 
            cols="12" sm="6" md="4" lg="3" xl="2">
            <v-card flat class="border cursor-pointer" v-ripple>
              <v-img 
                class="align-end text-white border-rounded"
                :src="project.image"
                cover
                max-height="220"
              >
                <v-card-title class="bg-black text-overline ext-medium-emphasis
                text-wrap">{{ project.title }}</v-card-title>
              </v-img>
              
              <v-card-subtitle class="pt-3 text-wrap">
                {{ project.userName }}
              </v-card-subtitle>

              <v-card-text class="text-wrap">
                <div>{{ project.description }}</div>
              </v-card-text>

              <v-card-actions>
                <v-btn variant="outlined" color="primary">Editar</v-btn>
                <v-btn append-icon="mdi-calendar-check"  variant="tonal" color="blue">Tarefas</v-btn>
              </v-card-actions>
            </v-card>
          </v-col> -->
        </v-row>    

        
        <div class="d-flex mt-10 mb-2">
          <a href="/tasks" class="text-decoration-none">
            <h2 class="font-weight-light">Tarefas em andamento:</h2>
          </a>
          <v-spacer></v-spacer>
          <v-btn 
              @click="callRoute('/new-task')"
              variant="tonal" 
              color="warning"
              append-icon="mdi-plus"
          >Criar Tarefa</v-btn>
        </div>
        <v-divider class="mb-10"></v-divider>

        <v-card class="mb-10">
          <v-card-text>
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
                        <td>
                          <v-chip 
                              append-icon="mdi-email" 
                              variant="plain" 
                              size="small"
                              class="cursor-pointer font-weight-bold"
                              color="orange"
                              @click.stop="callRoute('projects')"
                          >
                              {{ item.projectTitle }}
                          </v-chip>
                        </td>
                        <td>{{ item.timeConsumed }}</td>
                        <td>{{ item.startDate }}</td>
                        <td>{{ item.endDate }}</td>
                        
                    </tr>
                </tbody>
            </v-table>
        </v-card-text>
      </v-card>

      <br>
      <br>
    </div>
</template>

<script setup>
import { ref, computed, onMounted  } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/UserStore'
import { useProjectStore } from '@/stores/ProjectStore'
import { useTaskStore } from '@/stores/TaskStore'
import userService from '@/services/userService'

let userStore = useUserStore()
let projectStore = useProjectStore()
let taskStore = useTaskStore()

onMounted(async () => {
  projectStore = useProjectStore()
  taskStore = useTaskStore()

  let response = await userService.getById(2)
  let tasks = await userService.getTasksByUserId(2)

  projectStore.setProjectList(response.projects)
  taskStore.setTasksList(tasks)
})

const router = useRouter()

const callRoute = (routeName) => {
  router.push(routeName)
  window.scrollTo(0, 0);
}

let user = computed(() => {
  let result = userStore.getUser()

  if (result) return result

  return null
}) 

const openProject = (project) => {
  projectStore.setProjectSelected(project)

  callRoute('/project')
}

let isDialogOpen = ref(false)

let projects = computed(() => {
    var oi = projectStore.getProjectsList()
    console.log('projects oi: ', oi)

    return projectStore.getProjectsList()
})

let recentProjects = ref([
    {
        id: 1,
        title: 'Projeto Planejamento - AR23',
        description: 'Planejamento projetos 2024 - Outubro',
        userName: 'Eduardo',
        createdAt: '26/09/2024 9:40 PM',
        image: 'https://images.pexels.com/photos/28518085/pexels-photo-28518085.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        level: 2 
    },
    {
        id: 2,
        title: 'Projeto Desenvolvimento - AR23',
        description: 'Desenvolvimento atividades',
        userName: 'Eduardo',
        createdAt: '26/09/2024 9:40 PM',
        image: 'https://images.pexels.com/photos/28770118/pexels-photo-28770118/free-photo-of-futuro.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        level: 4
    },
    {
        id: 3,
        title: 'Projeto Validações - AR23',
        description: 'Validações',
        userName: 'Eduardo',
        createdAt: '26/09/2024 9:40 PM',
        image: 'https://images.pexels.com/photos/28751787/pexels-photo-28751787/free-photo-of-cena-de-rua-encantadora-em-hanoi-vietna.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        level: 3 
    },
    {
        id: 3,
        title: 'Projeto Validações - AR23',
        description: 'Validações',
        userName: 'Eduardo',
        createdAt: '26/09/2024 9:40 PM',
        image: 'https://images.pexels.com/photos/28751787/pexels-photo-28751787/free-photo-of-cena-de-rua-encantadora-em-hanoi-vietna.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        level: 3 
    },
    {
        id: 3,
        title: 'Projeto Validações - AR23',
        description: 'Validações',
        userName: 'Eduardo',
        createdAt: '26/09/2024 9:40 PM',
        image: 'https://images.pexels.com/photos/28751787/pexels-photo-28751787/free-photo-of-cena-de-rua-encantadora-em-hanoi-vietna.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        level: 3 
    },
])

let taskList = computed(() => taskStore.getTasksList())

let taskListHeader = ref([
    {
    align: 'start',
    key: 'id',
    title: 'Id',
    },
    { key: 'title', title: 'Tarefa' },
    { key: 'projectTitle', title: 'Projeto' },
    { key: 'timeConsumed', title: 'Tempo Gasto' },
    { key: 'startDate', title: 'Início' },
])

</script>