<template>
    <div class="h-screen">
        <div class="d-flex">
            <h1 class="font-weight-light">Escolha o projeto e crie uma tarefa!</h1>
            <v-spacer></v-spacer>
            <v-btn 
                class="mr-4"
                variant="tonal" 
                color="secondary"
                icon="mdi-keyboard-backspace"
                to="/tasks"
            ></v-btn>
        </div>
        <v-divider class="mt-2 mb-10"></v-divider>

        <div class="d-flex flex-column">
            <v-row>
                <v-col cols="12" md="6">
                    <v-select
                    class="mr-3"
                    label="Projetos"
                    variant="outlined"
                    :items="[
                        'Projeto Desenvolimento 1',
                        'Projeto Desenvolimento 2',
                        'Projeto Desenvolimento 3'
                    ]"
                ></v-select>
                </v-col>
            </v-row>

            <v-row>
                <v-col cols="12" md="6">
                    <v-text-field 
                        label="Título" 
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
                <v-col cols="12" md="3">
                    <v-text-field 
                        label="Data Ínicio" 
                    ></v-text-field>
                </v-col>
                <v-col cols="12" md="3">
                    <v-text-field 
                        label="Data Fim" 
                    ></v-text-field>
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
                    >Criar Tarefa</v-btn>
                </v-col>
            </v-row>
        </div>
    </div>
</template>