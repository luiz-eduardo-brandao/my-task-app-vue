<template>
    <div class="h-screen">
        <div class="d-flex">
            <h1 class="font-weight-light">Crie seu projeto!</h1>
            <v-spacer></v-spacer>
            <v-btn 
                class="mr-4"
                variant="tonal" 
                color="secondary"
                icon="mdi-keyboard-backspace"
                to="/projects"
            ></v-btn>
        </div>
        <v-divider class="mt-2 mb-10"></v-divider>

        <div class="d-flex flex-column">
            <v-row>
                <v-col cols="12" md="6">
                    <v-text-field 
                        label="Título" 
                        placeholder="Digite o nome de usuário..."
                    ></v-text-field>
                </v-col>    
            </v-row>
            <v-row>
                <v-col cols="12" md="6">
                    <v-textarea
                    label="Descrição"
                    name="input-7-1"
                    variant="filled"
                    auto-grow
                    ></v-textarea>
                </v-col>
            </v-row>

            <v-row>
                <v-col cols="6" md="3">
                    <v-select
                    class="mr-3"
                    label="Dificuldade"
                    variant="outlined"
                    :items="['Fácil', 'Médio', 'Difícil']"
                ></v-select>
                </v-col>
            </v-row>

            <v-row>
                <v-col cols="12" md="6">
                    <v-select
                        v-model="colaborators"
                        :items="users"
                        :item-props="itemProps"
                        hint="Escolha os colaboradores para esse projeto"
                        label="Colaboradores"
                        chips
                        multiple
                        clearable
                        persistent-hint
                        variant="solo-filled"
                    ></v-select>
                </v-col>
            </v-row>

            <v-row class="mt-10">
                <v-col>
                    <v-btn 
                        class="mr-4"
                        variant="tonal" 
                        color="primary"
                        :loading="loginLoading"
                        size="large"
                    >Criar Projeto</v-btn>
                </v-col>
            </v-row>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'

let colaborators = ref([])
let users = ref([
        { id: 1, nome: 'Eduardo', email: 'oi@gmail.com'},
        { id: 2, nome: 'Rafael', email: 'oi@gmail.com'},
        { id: 3, nome: 'Pedro', email: 'oi@gmail.com'},
        { id: 4, nome: 'Jorge', email: 'oi@gmail.com'},
        { id: 5, nome: 'JoAndrérge', email: 'oi@gmail.com'},
    ])

const itemProps = (item) => {
    return {
        title: item.nome,
        subtitle: item.email,
    }
}

</script>