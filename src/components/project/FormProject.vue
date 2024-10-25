<template>
    <v-dialog width="50%" v-model="props.isOpen">
        <v-card>
            <v-card-title>
            <span class="font-weight-light text-grey text-h6">{{ label }}</span>
            </v-card-title>
            <v-card-text>
                <v-text-field 
                    label="Titulo" 
                    variant="outlined"
                ></v-text-field>

                <v-select
                    class="mt-5"
                    label="Dificuldade"
                    variant="outlined"
                    :items="['Fácil', 'Médio', 'Difícil']"
                ></v-select>

            </v-card-text>

            <v-card-actions class="pa-4">
                <v-spacer></v-spacer>
                <v-btn variant="text" @click="$emit('close')">Cancelar</v-btn>
                <v-btn variant="tonal" color="success" @click="$emit('close')">Salvar</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script setup>

let props = defineProps({
    isOpen: {
        type: Boolean
    },
    label: {
        type: String
    }
})


</script>