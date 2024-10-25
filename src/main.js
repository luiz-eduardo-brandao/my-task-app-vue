/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import { registerPlugins } from '@/plugins'
import { useUserStore } from '@/stores/UserStore'

// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'

const app = createApp(App)

registerPlugins(app)

if (localStorage.getItem('token')) {
    (async () => {
        try {
            const userStore = useUserStore();
            const isAuthenticated = await userStore.checkToken();

            if (isAuthenticated) {                
                let user = JSON.parse(localStorage.getItem('user'))
                userStore.setUser(user)
            }
            
        } catch (error) {
            console.log(error)
        }
    })()
}

app.mount('#app')
