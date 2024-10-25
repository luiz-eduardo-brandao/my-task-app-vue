<template>
  <v-app :theme="theme">
    <SnackBar />

    <div v-if="!userStore.getIsAuthenticated()">
      <Lobby />
    </div>
    <div v-else>
      <Drawer 
        :isDrawerOpen="isDrawerOpen"
        @toggleDrawer="openCloseDrawer"  
      />
  
      <NavBar 
        :isDrawerOpen="isDrawerOpen"
        :isUserAuthenticated="userStore.getIsAuthenticated()"
        @changeTheme="changeTheme"
        @toggleDrawer="openCloseDrawer" 
      >
        <template #nav-bar-menu>
          <NavBarMenu 
            :profileImg="user.image"
            @logout="logout"
          >
            <template #dialog>
              <Dialog 
                :dialog="dialog" 
                icon="mdi-logout"
                message="Saindo..."
              />
            </template>
          </NavBarMenu>
        </template>
      </NavBar>

      <v-main>
        <v-container max-width="90%" min-height="h-screen" class="">
            <RouterView />
        </v-container>
        
        <Footer class="mt-10"/>
      </v-main>
    </div>
  </v-app>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from './stores/UserStore'
import { useMenuStore } from '@/stores/MenuStore'

const router = useRouter()
const callRoute = (routeName) => router.push(routeName)

const userStore = useUserStore()
const menuStore = useMenuStore()

let user = computed(() => userStore.getUser() )
let theme = computed(() => menuStore.getTheme() )

import Lobby from './views/Account/Lobby.vue'
import Drawer from './components/Drawer.vue'
import NavBar from './components/NavBar.vue'
import NavBarMenu from './components/NavBarMenu.vue'
import Footer from './components/Footer.vue'
import Dialog from './components/Dialog.vue'
import SnackBar from '@/components/SnackBar.vue'

let isDrawerOpen = ref(false)
let dialog = ref(false)

const openCloseDrawer = () => {
  isDrawerOpen.value = !isDrawerOpen.value
}

const changeTheme = () => {
  menuStore.setTheme(theme.value == 'dark' ? 'light' : 'dark')
}

const logout = () => {
  dialog.value = true

  setTimeout(() => {
    userStore.logout()
    callRoute('/login')
    dialog.value = false
  }, 2000)
}

</script>
