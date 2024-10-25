import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useProjectStore = defineStore('project', () => {
    //state
    let projectSelected = ref(null)
    let projects = ref([])
    // let projects = ref([
    //     {
    //         id: 1,
    //         title: 'Projeto Planejamento - AR23',
    //         description: 'Planejamento projetos 2024 - Outubro',
    //         userName: 'Eduardo',
    //         createdAt: '26/09/2024 9:40 PM',
    //         image: 'https://images.pexels.com/photos/28518085/pexels-photo-28518085.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    //         level: 2 
    //     },
    //     {
    //         id: 2,
    //         title: 'Projeto Desenvolvimento - AR23',
    //         description: 'Desenvolvimento atividades',
    //         userName: 'Eduardo',
    //         createdAt: '26/09/2024 9:40 PM',
    //         image: 'https://images.pexels.com/photos/28770118/pexels-photo-28770118/free-photo-of-futuro.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    //         level: 4
    //     },
    //     {
    //         id: 3,
    //         title: 'Projeto Validações - AR23',
    //         description: 'Validações',
    //         userName: 'Eduardo',
    //         createdAt: '26/09/2024 9:40 PM',
    //         image: 'https://images.pexels.com/photos/28751787/pexels-photo-28751787/free-photo-of-cena-de-rua-encantadora-em-hanoi-vietna.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    //         level: 3 
    //     },
    //     {
    //         id: 3,
    //         title: 'Projeto Validações - AR23',
    //         description: 'Validações',
    //         userName: 'Eduardo',
    //         createdAt: '26/09/2024 9:40 PM',
    //         image: 'https://images.pexels.com/photos/28751787/pexels-photo-28751787/free-photo-of-cena-de-rua-encantadora-em-hanoi-vietna.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    //         level: 3 
    //     },
    //     {
    //         id: 3,
    //         title: 'Projeto Validações - AR23',
    //         description: 'Validações',
    //         userName: 'Eduardo',
    //         createdAt: '26/09/2024 9:40 PM',
    //         image: 'https://images.pexels.com/photos/28751787/pexels-photo-28751787/free-photo-of-cena-de-rua-encantadora-em-hanoi-vietna.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    //         level: 3 
    //     },
    // ])

    //actions
    
    const setProjectSelected = (payload) => {
        projectSelected.value = payload
    }

    const setProjectList = (list) => {
        projects.value = list
    }

    // getters
    const getProjectSelected = () => projectSelected.value
    const getProjectsList = () => projects.value

    return {
        setProjectSelected,
        getProjectSelected,
        getProjectsList,
        setProjectList
    }
})