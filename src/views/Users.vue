<template>
    <div class="h-screen">
        <h1 class="font-weight-light">Usuários</h1>
        
        <v-divider class="my-6"></v-divider>
    
        <v-card>
            <v-row class="d-flex justify-space-between pa-4">
                <v-card-title>Lista de Usuários</v-card-title>
                <v-card-title>
                    <v-btn
                        @click="isDialogOpen = !isDialogOpen" 
                        variant="tonal" 
                        size="small" 
                        color="warning"
                    >Adicionar Usuário</v-btn>
                
                    <v-dialog 
                        v-model="isDialogOpen"
                        max-width="900"
                    >
                        <v-card>
                        <v-card-title>
                            <span class="font-weight-light text-grey text-h6">Adicionar Usuário</span>
                        </v-card-title>
                        <v-card-text>
                            <v-row>
                            <v-col cols="12" md="6">
                                <v-text-field 
                                label="Nome" 
                                variant="outlined"
                                :rules="nomeRules"
                                ></v-text-field>
                            </v-col>

                            <v-col cols="12" md="6">
                                <v-text-field 
                                label="Email" 
                                variant="outlined"
                                :rules="emailRules"
                                ></v-text-field>
                            </v-col>
                            </v-row>

                            <v-select
                                class="mt-5"
                                label="Cargo"
                                variant="outlined"
                                :items="['Admin', 'Gerente', 'Convidado']"
                            ></v-select>

                            <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn variant="text" @click="isDialogOpen = !isDialogOpen">Cancelar</v-btn>
                            <v-btn variant="tonal" color="success" @click="isDialogOpen = !isDialogOpen">Salvar</v-btn>
                            </v-card-actions>
                        </v-card-text>
                        </v-card>
                    </v-dialog>
                </v-card-title>
            </v-row>
    
            <v-card-text>
                <v-data-table
                    :headers="headers"
                    :items="users"
                >
                    <template #item.role="{ item }">
                        <v-chip 
                            :color="getColor(item.role)"
                            variant="outlined" 
                            size="small"
                        >
                            {{ item.role }}
                        </v-chip>
                    </template>
                    
                    <template #item.actions="{ item }">
                        <v-btn 
                            icon="mdi-pencil"
                            color="primary"
                            class="rounded-7 ma-2"
                            variant="text"
                            size="small"
                        ></v-btn>

                        <v-btn 
                            icon="mdi-delete"
                            color="red"
                            class="rounded-7 ma-2"
                            variant="text"
                            size="small"
                        ></v-btn>
                    </template>
                </v-data-table>
            </v-card-text>
        </v-card>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useUserStore } from '../stores/UserStore'

const userStore = useUserStore()

let isDialogOpen = ref(false)

let users = userStore.getListaUsuarios()
let headers = userStore.getListaUsuariosHeader()

const getColor = (role) => {
    if (!role) return ''

    if (role == 'Admin') return 'primary'
    if (role == 'Gerente') return 'green'
}

</script>