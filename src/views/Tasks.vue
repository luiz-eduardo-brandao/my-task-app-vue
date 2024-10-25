<template>
    <div class="h-screen mb-10">
        <h1 class="font-weight-light">Suas Tarefas!</h1>
        
        <v-divider class="my-6"></v-divider>
        
        <v-container>
            <v-row justify="center">
                <v-text-field 
                    class="px-3 mx-2"
                    label="Pesquisar"
                    variant="outlined"
                ></v-text-field>
                <v-select
                    class="mr-3"
                    label="Projetos"
                    variant="outlined"
                    :items="projects"
                ></v-select>
            
                <v-btn icon="mdi-magnify" class="mx-2"></v-btn>

                <v-spacer></v-spacer>
                <div class="d-flex justify-center ">
                    <v-btn align="center"
                        class="mt-3 mr-3"
                        variant="tonal" 
                        color="primary"
                        to="/new-task"
                    >
                        Nova Tarefa <v-icon  class="ml-2" icon="mdi-plus"></v-icon>
                    </v-btn>
                    <div class="d-flex justify-center flex-column mx-4 text-subtitle-2 font-weight-light">
                        <v-switch 
                            v-model="listType"
                            @click="store.setListType()"
                            theme="light"
                            color="purple-darken-2"
                            base-color="blue"
                            false-icon="mdi-view-dashboard"
                            true-icon="mdi-format-list-bulleted"
                            inset 
                            class="mx-3"
                        ></v-switch>
                    </div>
                </div>
            </v-row>
        </v-container>
     

        <div class="mt-5 mb-10">
            <v-row v-if="!listType">
                <v-col
                    cols="12" sm="6" md="4" lg="3"
                    v-for="item in taskList"
                    :key="item.id"
                    @click="openEditTask(item)"
                >
                    <v-card 
                        v-ripple 
                        class="cursor-pointer" 
                    >
                        <v-card-title class="font-weight-light text-small">{{ item.title }}</v-card-title>

                        <v-card-text 
                            class="mt-2 pa-2 mx-2 rounded border bg-purple-darken-2
                            text-center"
                        >
                            <div class="text-center">
                                <strong>
                                    {{ item.projectTitle }}
                                </strong>
                            </div>
                        </v-card-text>

                        <v-card-text 
                            class="mt-2 pa-2 mx-2 rounded border  text-center"
                        >
                            <strong>Início:</strong> {{ item.startDate }} | <strong>Fim:</strong> {{ item.endDate }}
                        </v-card-text>

                        <v-card-text 
                            class="mt-2 pa-1 mx-2 rounded border  text-center"
                        >
                            <div class="font-weight-light">
                                <strong>Total Gasto:</strong>  {{ item.timeConsumed }}
                            </div>
                        </v-card-text>

                        <v-card-text class="mt-2">
                            <div class="d-flex flex-column">
                                <h3 class="mb-1 font-weight-light">Descrição:</h3>
                                {{ item.description }}  
                            </div>
                        </v-card-text>

                        <v-card-actions>
                            <v-row justify="center">
                                <v-btn class="" base-color="blue" append-icon="mdi-play-outline">Iniciar</v-btn>
                                <v-btn class="" base-color="blue" prepend-icon="mdi-pause">Parar</v-btn>
                                <v-btn class="mx-2" variant="tonal" color="red">Excluir</v-btn>
                            </v-row>
                        </v-card-actions>
                    </v-card>
                </v-col>
            </v-row>
            <v-row v-else>  
                    <v-col cols="12">
                        <v-card>
                            <v-row class="d-flex pa-4">
                                <v-card-title>Lista de Tarefas</v-card-title>
                            </v-row>
                
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
                                            @click="openEditTask(item)"
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
                                           
                                            <td>
                                                <v-btn 
                                                    icon="mdi-play-circle-outline"
                                                    color="primary"
                                                    class="rounded-7 ma-2"
                                                    variant="text"
                                                    :disabled="item.startDate"
                                                ></v-btn>
                                            </td>
                                            <td>
                                                <v-btn 
                                                    icon="mdi-stop-circle-outline"
                                                    color="red"
                                                    class="rounded-7 ma-2"
                                                    variant="text"
                                                    :disabled="item.endDate"
                                                ></v-btn>
                                            </td>
                                            <!-- </td> -->
                                            <td>
                                            <!-- <td> -->
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
                    </v-col>         
            </v-row>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useTaskStore } from '@/stores/TaskStore'
import { useProjectStore } from '@/stores/ProjectStore'

const store = useTaskStore()
const projectStore = useProjectStore()

const router = useRouter()

const callRoute = (routeName) => {
  router.push(routeName)
  window.scrollTo(0, 0);
}

let listType = computed(() => store.getListType())
let projects = computed(() => projectStore.getProjectsList())

const openEditTask = (task) => {
    console.log('openEditTask', task)

    store.setTaskSelected(task)

    callRoute('/task')
}

let taskList = computed(() => store.getTasksList())

let taskListHeader = ref([
    {
    align: 'start',
    key: 'id',
    title: 'Id',
    },
    { key: 'projectTitle', title: 'Projeto' },
    { key: 'title', title: 'Tarefa' },
    { key: 'timeConsumed', title: 'Tempo Gasto' },
    { key: 'startDate', title: 'Início' },
    { key: 'endDate', title: 'Fim' },
    { key: 'start', title: 'Iniciar' },
    { key: 'pause', title: 'Pausar'},
    { key: 'timeline', title: 'Histórico'}
])
</script>