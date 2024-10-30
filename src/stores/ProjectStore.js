import { ref } from 'vue'
import { defineStore } from 'pinia'
import projectService from '@/services/projectService'

export const useProjectStore = defineStore('project', () => {
    let projectSelected = ref(null)
    let projects = ref([])

    const setProjectSelected = (payload) => {
        projectSelected.value = payload
    }

    const setProjectList = (list) => {
        projects.value = list
    }

    const getProjectSelected = () => projectSelected.value
    const getProjectsList = () => projects.value

    async function loadProjectData() {
        let idUser = localStorage.getItem('idUser')

        var projectsList = await projectService.getAllByUserId(idUser)

        setProjectList(projectsList)
    }

    return {
        setProjectSelected,
        getProjectSelected,
        getProjectsList,
        setProjectList,
        loadProjectData
    }
})