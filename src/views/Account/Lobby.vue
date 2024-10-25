<template>
    <div>
        <Drawer 
            :isDrawerOpen="isDrawerOpen"
            @toggleDrawer="openCloseDrawer"  
        />
  
        <NavBar 
            :isDrawerOpen="isDrawerOpen"
            @toggleDrawer="openCloseDrawer" 
        >
            <template #nav-bar-menu>
                <v-btn 
                    prepend-icon="mdi-login"
                    to="/login"
                >
                    Login
                </v-btn>
                <v-btn 
                    prepend-icon="mdi-account-outline" 
                    to="/registerAccount"
                >
                    Criar Conta
                </v-btn>
            </template>
        </NavBar>
        
        <v-main>
            <v-container max-width="90%" class="h-screen">
                <RouterView />
            </v-container>
            
            <Footer />
        </v-main>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import NavBar from '../../components/NavBar.vue'
import Footer from '../../components/Footer.vue'

let isDrawerOpen = ref(false)

const openCloseDrawer = () => {
  isDrawerOpen.value = !isDrawerOpen.value
}
</script>