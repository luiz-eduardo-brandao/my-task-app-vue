<template>
    <v-row justify="center" class="h-75">
        <v-col
            align-self="center"
            cols="12"
            md="3"
            class="mt-5"
        >
            <div class="d-flex justify-center">
                <h1 class="font-weight-light d-flex">
                    <v-img
                        class="mr-3 mt-3"
                        height="20"
                        width="20"
                        src="../../assets/logo-task.png"
                    ></v-img>
                    MyTask App
                </h1>
            </div>
        </v-col>
        <v-col
            align-self="center"
            cols="12"
            md="6"
            class="mt-5"
        >                
            <div class="d-flex justify-center">
                <v-card width="700" class="pa-5 rounded-md border">
                    <v-row justify="center">
                        <v-card-title>Crie sua conta!</v-card-title>
                    </v-row>
            
                    <v-card-text class="mt-4">
                        <v-text-field 
                            label="Username" 
                            placeholder="Digite o nome de usuário..."
                        ></v-text-field>

                        <v-text-field
                            class="mt-3" 
                            label="Telefone" 
                        ></v-text-field>

                        <v-text-field
                            class="mt-3" 
                            label="Data de Nascimento" 
                        ></v-text-field>
                
                        <v-text-field 
                            label="Email" 
                            placeholder="Digite o email..."
                        ></v-text-field>
        
                        <v-text-field
                            class="mt-3" 
                            label="Senha" 
                            placeholder="digite a senha..."
                            type="password"
                        ></v-text-field>

                        <v-text-field
                            class="mt-3" 
                            label="Confirmar Senha" 
                            placeholder="digite a senha..."
                            type="password"
                        ></v-text-field>
                    </v-card-text>
            
                    <v-card-actions>
                        <v-row justify="center" class="mx-4">
                            <v-btn 
                                variant="tonal" 
                                block 
                                color="purple"
                                :loading="loginLoading"
                                size="large"
                            >Criar Conta</v-btn>
                        </v-row>
                    </v-card-actions>
                </v-card>
            </div>
        </v-col>
    </v-row>
</template>