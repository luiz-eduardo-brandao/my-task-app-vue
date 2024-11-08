<template>
    <v-row justify="center" class="mb-10">
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

                        
                        {{ date }}

                        <v-menu 
                            v-model="menu"
                            :close-on-content-click="false"
                            transition="scale-transition"
							offset-y
                        >
                            <template v-slot:activator="{ props }">
                                <!-- <v-btn class="mr-7 pa-3" icon v-bind="props">
                                    <v-icon icon="mdi-bell-outline"></v-icon>
                                </v-btn> -->
                                <v-text-field
									label="Data de Nascimento"
									prepend-inner-icon="mdi-calendar"
                                    v-bind="props"
									@click:clear="date = ''"
									v-model="date"
								></v-text-field>
                            </template>
                            <v-confirm-edit 
                                v-model="date"
                                @save="toggleMenu()" 
                                @cancel="toggleMenu()" 
                            >
                                <template v-slot:default="{ model: proxyModel, actions }">
                                    <v-date-picker v-model="proxyModel.value">
                                        <template v-slot:actions>
                                            <component :is="actions" ></component>
                                        </template>
                                    </v-date-picker>
                                </template>
                            </v-confirm-edit>
                            <!-- <v-date-picker v-model="date" show-adjacent-months></v-date-picker> -->
                        </v-menu>
                        <!-- <v-menu
							v-model="menu"
							:close-on-content-click="false"
							:return-value.sync="date"
							transition="scale-transition"
							offset-y
							max-width="290px"
							min-width="290px"
						>
							<template v-slot:activator="{ on, attrs }">
								<v-text-field
									hide-details
									label="Data Emissão"
									outlined
									flat
									prepend-inner-icon="mdi-calendar"
									clearable
									v-bind="attrs"
									v-on="on"
									@click:clear="date = ''"
									v-model="computedDateFormatted"
								></v-text-field>
							</template>
                            <v-confirm-edit v-model="date">
                                <template v-slot:default="{ model: proxyModel, actions }">
                                    <v-date-picker v-model="proxyModel.value">
                                    <template v-slot:actions>
                                        <component :is="actions"></component>
                                    </template>
                                    </v-date-picker>
                                </template>
                            </v-confirm-edit>
						</v-menu> -->
                        
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

<script setup>
import { ref, computed } from 'vue'

let menu = ref(false)
let date = ref(null)

function toggleMenu() {
    menu.value = false
}

let computedDateFormatted =  computed(() => {
    if (!date) 
        return ''
    return 
        formatDate(date)
})

function formatDate(date) {
    if (!date) return null

    const [year, month, day] = date.split('-')
    return `${day}/${month}/${year}`
}
</script>