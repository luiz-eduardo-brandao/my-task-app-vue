<template>
    <v-app-bar 
      flat 
      class="border-b" 
    >
      <v-app-bar-nav-icon v-if="isUserAuthenticated"
        v-show="!props.isDrawerOpen"
        @click="$emit('toggleDrawer')"
      />
      
      <v-app-bar-title>
        <div 
          variant="text" 
          class="d-flex"
        >
          <h3 
            class="font-weight-light cursor-pointer d-flex"
            @click="callRoute('/')"
          >
          <v-img
            class="mr-3 mt-1"
            height="20"
            width="20"
            src="../assets/logo-task.png"
          ></v-img>
            MyTask - App
          </h3>
        </div>
      </v-app-bar-title>

      <v-switch 
          @click="$emit('changeTheme')"
          theme="light"
          base-color="white-darken-1"
          color="grey-darken-3"
          false-icon="mdi-white-balance-sunny"
          true-icon="mdi-moon-waxing-crescent"
          inset 
          class="mx-3 mt-5"
      ></v-switch>

      <slot name="nav-bar-menu"></slot>
    </v-app-bar>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()
const callRoute = (routeName) => {
  router.push(routeName)
  window.scrollTo(0, 0);
}

let props = defineProps({
    isDrawerOpen: {
      type: Boolean
    },
    isUserAuthenticated: {
      type: Boolean
    }
})


</script>