<template>
    <v-container max-width="60%" min-width="600">
        <h1>Perfil</h1>

        <v-divider class="my-6"></v-divider>

        <v-row>
            <v-col>
                <v-card class="bg-purple-darken-2 d-flex flex-column ">
                    <v-card-title>Foto</v-card-title>
                    <v-img
                        cover
                        src="https://cdn.vuetifyjs.com/images/john.jpg"
                    ></v-img>

                    <v-card-text>Foto Perfil</v-card-text>
                </v-card>
            </v-col>
            <v-col>
                <div>
                    Nome
                </div>
                <div>
                    Email
                </div>
                <div>
                    Celular
                </div>
            </v-col>
        </v-row>

        <v-row>
            <v-col>
                <div>Sobre Mim</div>
                <v-card class="bg-purple-darken-2 mt-3">
                    <v-card-text>Descrição...</v-card-text>
                </v-card>
            </v-col>
            <v-col>
                <div>Contatos</div>    
                <v-card class="bg-purple-darken-2 mt-3">
                    <v-card-text>Descrição...</v-card-text>
                </v-card>
            </v-col>
            <v-col>
                <div>Redes Sociais</div>
                <v-card class="bg-purple-darken-2 mt-3">
                    <v-card-text>Descrição...</v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>
