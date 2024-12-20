import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '../stores/UserStore'
import { useProjectStore } from '@/stores/ProjectStore'
import { useTaskStore } from '@/stores/TaskStore'

import Login from '../views/Account/Login.vue'
import RegisterAccount from '../views/Account/RegisterAccount.vue'

import Home from '../views/Home.vue'
import Users from '../views/Users.vue'
import Projects from '../views/Projects.vue'
import Tasks from '../views/Tasks.vue'
import Profile from '../views/Profile.vue'
import EditProject from '@/views/Project/EditProject.vue'
import NewProject from '@/views/Project/NewProject.vue'
import EditTask from '@/views/Task/EditTask.vue'
import NewTask from '@/views/Task/NewTask.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home,  
            meta: {
                authorize: true
            }
        },
        {
            path: '/users',
            name: 'users',
            component: Users,
            meta: {
                authorize: true
            }
        },
        {
            path: '/projects',
            name: 'projects',
            component: Projects,
            meta: {
                authorize: true
            }
        },
        {
            path: '/project',
            name: 'project',
            component: EditProject,
            meta: {
                authorize: true
            }
        },
        {
            path: '/new-project',
            name: 'newProject',
            component: NewProject,
            meta: {
                authorize: true
            }
        },
        {
            path: '/tasks',
            name: 'tasks',
            component: Tasks,
            meta: {
                authorize: true
            }
        },
        {
            path: '/task',
            name: 'editTask',
            component: EditTask,
            meta: {
                authorize: true
            }
        },
        {
            path: '/new-task',
            name: 'newTask',
            component: NewTask,
            meta: {
                authorize: true
            }
        },
        {
            path: '/profile',
            name: 'profile',
            component: Profile,
            meta: {
                authorize: true
            }
        },
        {
            path: '/login',
            name: 'login',
            component: Login
        },
        {
            path: '/registerAccount',
            name: 'registerAccount',
            component: RegisterAccount
        },
    ]
})

router.beforeEach(async (to, from, next) => {
    if (to.meta?.authorize) {
        const userStore = useUserStore()

        const isTokenValid = await userStore.checkUser();

        if (isTokenValid) {
            await userStore.loadUserData()

            if (userStore.getIsAuthenticated()) 
            {
                const taskStore = useTaskStore()
                const projectStore = useProjectStore()
                
                await projectStore.loadProjectData()
                await taskStore.loadTaskData()

                if (to.name == 'login') {
                    next({ name: 'home'})
                    return 
                }
                else {
                    next();
                    return
                }
            }
        }
        
        userStore.logout()

        next({ name: 'login'})
        return
    }
    
    next();
})

export default router