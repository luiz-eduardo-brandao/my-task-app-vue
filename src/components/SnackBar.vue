<template>
    <v-snackbar
        :timeout="time"
        :color="color"
        elevation="10"
        :model-value="isOpen"
    >
        <p class="text-center">
            {{ message }}
        </p>
    </v-snackbar>
</template>

<script setup>
import { computed } from 'vue'
import { useSnackBarStore } from '@/stores/SnackBarStore'

const store = useSnackBarStore()

let isOpen = computed(() => store.getIsOpen())
let time = computed(() => store.getTime() )
let message = computed(() => store.getMessage() )
let color = computed(() => store.getColor() )

</script>