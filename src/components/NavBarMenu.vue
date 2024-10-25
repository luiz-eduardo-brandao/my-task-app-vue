<template #append>
    <v-menu>
        <template v-slot:activator="{ props }">
        <v-btn class="mr-7 pa-3" icon v-bind="props">
            <v-badge :content="counter" color="red">
            <v-icon icon="mdi-bell-outline"></v-icon>
            </v-badge>
        </v-btn>
        </template>
        
        <v-card 
            class="rounded-lg mx-3"
            min-width="200px" 
            max-width="550px"
            max-height="500px"
        >
            <v-card-title>
                <span class="text-left text-grey text-subtitle-1">Notificações ({{ counter }})</span>
            </v-card-title>
            
            <v-divider></v-divider>
            
            <v-list>
                <div v-for="item in notificationsList" :key="item.id">
                    <v-list-item
                        :prepend-icon="item.prependIcon" 
                        :append-icon="item.appendIcon"
                        class="my-2 mx-2"
                        :to="item.route"
                        @click="scrollToTop"
                    >
                        <v-list-item-title class="text-h6">
                            {{ item.title }}
                        </v-list-item-title>

                        <span class="text-subtitle-1 font-weight-light">
                            {{ item.subtitle }}
                        </span>
                    </v-list-item>
                </div>
            </v-list> 
        </v-card>
    </v-menu>

    <v-menu>
        <template v-slot:activator="{ props }">
        <v-avatar v-bind="props" class="cursor-pointer mr-5">
            <v-img
            cover
            src="../assets/user-edu.jpg"
            ></v-img>
        </v-avatar>  
        </template>

        <v-card class="pa-2" min-width="200px">
            <v-card-text>
                <div class="d-flex flex-column">
                    <h2 class="font-weight-light">
                        {{ user.nome }}
                    </h2>
                    <h3 class="text-subtitle-1">
                        {{ user.email }}  
                    </h3>
                </div>
                <v-divider class="mt-2"></v-divider>
            </v-card-text>

            <v-list :lines="false" density="compact" nav>
                <v-list-item 
                    to="/profile"
                    @click="scrollToTop"
                    prepend-icon="mdi-account-outline"
                >
                    <v-list-item-title>
                        Meu Perfil
                    </v-list-item-title>
                </v-list-item>

                <v-list-item 
                    to="/favoritos"
                    @click="scrollToTop"
                    prepend-icon="mdi-star-outline"
                >
                    <v-list-item-title>
                        Favoritos
                    </v-list-item-title>
                </v-list-item>

                <v-list-item 
                    to="/settings"
                    @click="scrollToTop"
                    prepend-icon="mdi-cog"
                >
                    <v-list-item-title>
                        Configurações
                    </v-list-item-title>
                </v-list-item>

                <v-divider class="my-2"></v-divider>

                <v-list-item  
                    @click="$emit('logout')"
                    class="cursor-pointer"
                    prepend-icon="mdi-logout"
                >
                    <v-list-item-title>
                        Sair
                    </v-list-item-title>
                </v-list-item>
            </v-list>
        </v-card>
    </v-menu>

    <slot name="dialog"></slot>
</template>

<script setup>
import { computed } from 'vue'
import { useMenuStore } from '@/stores/MenuStore'
import { useUserStore } from '@/stores/UserStore'

let props = defineProps({
    profileImg: {
        type: String
    }
})

const menuStore = useMenuStore()
const userStore = useUserStore()

let user = computed(() => userStore.getUser() )

let notificationsList = computed(() => menuStore.getNotificationsList())

let counter = computed(() => menuStore.getNotificationsList()?.length)

const scrollToTop = () => window.scrollTo(0, 0);
</script>
