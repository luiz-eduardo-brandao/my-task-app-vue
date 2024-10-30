import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import taskService from '@/services/taskService'

export const useTaskStore = defineStore('task', () => {
    //state
    let listType = ref(false)
    let taskSelected = ref(null)
    let tasksList = ref([])
    let tasksListFilter = ref(() => true)

    // let taskList = ref([
    //     {
    //         id: 1,
    //         title: 'Desenvolver rota de login',
    //         description: 'Phasellus feugiat arcu sapien, et iaculis ipsum elementum sit amet. Mauris cursus commodo interdum. Praesent ut risus eget metus luctus accumsan id ultrices nunc. Sed at orci sed massa consectetur dignissim a sit amet dui.',
    //         projectId: 1,
    //         projectTitle: 'Projeto Desenvolvimento - AR23',
    //         timeConsumed: '05:00',
    //         startDate: '27/09/2024 03:00',
    //     },
    //     {
    //         id: 2,
    //         title: 'Desenvolver tela de cadastro de usuários',
    //         description: 'Phasellus feugiat arcu sapien, et iaculis ipsum elementum sit amet. Mauris cursus commodo interdum. Praesent ut risus eget metus luctus accumsan id ultrices nunc. Sed at orci sed massa consectetur dignissim a sit amet dui.',
    //         projectId: 1,
    //         projectTitle: 'Projeto Desenvolvimento - AR23',
    //         timeConsumed: '03:00',
    //         startDate: '27/09/2024 03:00',
    //     },
    //     {
    //         id: 3,
    //         title: 'Otimizar consulta de tarefas',
    //         description: 'Phasellus feugiat arcu sapien, et iaculis ipsum elementum sit amet. Mauris cursus commodo interdum. Praesent ut risus eget metus luctus accumsan id ultrices nunc. Sed at orci sed massa consectetur dignissim a sit amet dui.',
    //         projectId: 1,
    //         projectTitle: 'Projeto Desenvolvimento | Etapa 2',
    //         timeConsumed: '08:00',
    //         startDate: '14/10/2024 03:00',
    //         endDate: '15/10/2024 03:00'
    //     }
    // ])

    //actions
 
    const setListType = () => listType.value = !listType.value
    
    const setTaskSelected = (payload) => {
        taskSelected.value = payload
    }

    const setTasksList = (list) => {
        tasksList.value = list
    }

    const setTasksListFilter = (newFilter) => {
        tasksListFilter.value = newFilter
    }

    const removeTasksListFilter = () => {
        tasksListFilter.value = () => true
    }

    // getters
    const getTaskSelected = () => taskSelected.value
    const getListType = () => listType.value
    const getTasksList = () => tasksList.value

    const getTasksListFiltered = computed(() => {
        return tasksList.value.filter(tasksListFilter.value)
    })

    async function loadTaskData() {
        console.log('loadTaskData')

        let idUser = localStorage.getItem('idUser')

        var tasksList = await taskService.getAllByUserId(idUser)

        setTasksList(tasksList)
    }

    return {
        getListType,
        setTaskSelected,
        setListType,
        getTaskSelected,
        getTasksList,
        setTasksList,
        setTasksListFilter,
        getTasksListFiltered,
        removeTasksListFilter,
        loadTaskData
    }

})