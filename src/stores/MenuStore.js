import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useMenuStore = defineStore('menu', () => {
    let menuList = ref([
        {
            id: 1,
            title: 'Home',
            route: '/',
            icon: 'mdi-home'
        },
        {
            id: 2,
            title: 'Projetos',
            route: '/projects',
            icon: 'mdi-email'
        },
        {
            id: 3,
            title: 'Tarefas',
            route: '/tasks',
            icon: 'mdi-check-outline'
        },
        {
            id: 4,
            title: 'Overview (em breve)',
            icon: 'mdi-monitor-dashboard',
            subMenu: [
                {
                    id: 5,
                    title: 'Dashboard',
                    icon: 'mdi-view-dashboard-edit-outline'
                },
                {
                    id: 6,
                    title: 'Faturamento',
                    icon: 'mdi-currency-usd'
                },
                {
                    id: 7,
                    title: 'Relatório',
                    icon: 'mdi-chart-line'
                },
            ]
        },
    ])

    let menuAdminList = ref([
        {
            id: 8,
            title: 'Usuários',
            route: '/users',
            icon: 'mdi-account'
        },
        {
            id: 9,
            title: 'Sistema (em breve)',
            route: '',
            icon: 'mdi-cog'
        },
    ])

    let notificationsList = ref([
        {
            id: 1,
            title: 'Boas Vindas!',
            subtitle: 'Phasellus feugiat arcu sapien, et iaculis ipsum elementum sit amet. Mauris cursus commodo interdum. Praesent ut risus eget metus luctus accumsan id ultrices nunc',
            route: '/users',
            prependIcon: 'mdi-bell-outline',
            appendIcon: 'mdi-email-open'
        },
        {
            id: 2,
            title: 'Vuetify & Freeflow Jobs',
            subtitle: 'Phasellus feugiat arcu sapien, et iaculis ipsum elementum sit amet. Mauris cursus commodo interdum. Praesent ut risus eget metus luctus accumsan id ultrices nunc',
            route: '/users',
            prependIcon: 'mdi-bell-outline',
            appendIcon: 'mdi-email-open'
        },
        {
            id: 3,
            title: 'Vuetify & Freeflow Jobs',
            subtitle: 'Phasellus feugiat arcu sapien, et iaculis ipsum elementum sit amet. Mauris cursus commodo interdum. Praesent ut risus eget metus luctus accumsan id ultrices nunc',
            route: '/users',
            prependIcon: 'mdi-bell-outline',
            appendIcon: 'mdi-email-open'
        },
        {
            id: 4,
            title: 'Vuetify & Freeflow Jobs',
            subtitle: 'Phasellus feugiat arcu sapien, et iaculis ipsum elementum sit amet. Mauris cursus commodo interdum. Praesent ut risus eget metus luctus accumsan id ultrices nunc',
            route: '/users',
            prependIcon: 'mdi-bell-outline',
            appendIcon: 'mdi-email-open'
        },
        {
            id: 5,
            title: 'Vuetify & Freeflow Jobs',
            subtitle: 'Phasellus feugiat arcu sapien, et iaculis ipsum elementum sit amet. Mauris cursus commodo interdum. Praesent ut risus eget metus luctus accumsan id ultrices nunc',
            route: '/users',
            prependIcon: 'mdi-bell-outline',
            appendIcon: 'mdi-email-open'
        },
    ])

    let theme = ref('dark')

    const setTheme = (value) => theme.value = value

    const getListaMenu = () => menuList.value
    const getListaMenuAdmin = () => menuAdminList.value
    const getNotificationsList = () => notificationsList.value
    const getTheme = () => theme.value

    return {
        setTheme,
        getListaMenu,
        getListaMenuAdmin,
        getNotificationsList,
        getTheme
    }

})