<template>
    <v-navigation-drawer class="d-flex flex-column justify-space-between " width="320" v-model="props.isDrawerOpen">
      <v-list class="h-100">
        <div class="d-flex">
            <v-list-item
                lines="two"
                prepend-avatar="../assets/user-edu.jpg"
                :subtitle="user ? user.email : ''"
                :title="user ? user.nome : ''"
            ></v-list-item>
            <v-spacer></v-spacer>            
            <v-app-bar-nav-icon class="mr-3" @click="$emit('toggleDrawer')"></v-app-bar-nav-icon>
        </div>

        <v-divider class="my-4"></v-divider>

        <v-list-subheader>Menu</v-list-subheader>

        <div v-for="item in listaMenu" :key="item.id">
            <v-list-item 
              v-if="!item.subMenu"
              :prepend-icon="item.icon" 
              :to="item.route"
              @click="scrollToTop"
            >{{ item.title }}</v-list-item>

            <v-list-group 
              v-else
              :value="item.id"
            >
              <template #activator="{ props }">  
                <v-list-item
                  v-bind="props"
                  :prepend-icon="item.icon"
                  :title="item.title"
                >
                </v-list-item>
              </template>
              <div v-for="sub in item.subMenu" :key="sub.id">
                <v-list-item 
                  :prepend-icon="sub.icon"
                >{{ sub.title }}</v-list-item>
              </div>
            </v-list-group>
        </div>

        <div v-if="isAdmin()">
          <v-divider class="my-3"></v-divider>

          <v-list-subheader>Administrativo</v-list-subheader>
  
          <div v-for="item in listaMenuAdmin" :key="item.id">
            <v-list-item 
              :prepend-icon="item.icon" 
              :to="item.route"
              @click="scrollToTop"
            >{{ item.title }}</v-list-item>
          </div>
        </div>

      </v-list>
      <!-- <v-row justify="center">
        <div class="position-absolute bottom-0 mb-5" >
          <v-btn icon="mdi-cog"></v-btn>
        </div>
      </v-row> -->
    </v-navigation-drawer>
</template>

<script setup>
import { useUserStore } from '../stores/UserStore'
import { useMenuStore } from '@/stores/MenuStore'
import { computed } from 'vue'

const useStore = useUserStore()
const menuStore = useMenuStore()

let listaMenu = computed(() => menuStore.getListaMenu())
let listaMenuAdmin = computed(() => menuStore.getListaMenuAdmin())

let user = computed(() => useStore.getUser())

const isAdmin = () => {
  const user = useStore.getUser()

  return user?.role == 'Admin' ? true : false
}

let props = defineProps({
    isDrawerOpen: {
        type: Boolean
    }
})

const scrollToTop = () => window.scrollTo(0, 0);

</script>