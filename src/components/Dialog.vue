<template>
    <v-dialog
        v-model="props.dialog"
        max-width="320"
        persistent
    >
        <v-list
            class="py-2"
            color="primary"
            elevation="12"
            rounded="lg"
        >
            <v-list-item
            :prepend-icon="props.icon"
            :title="props.message"
            >
            <template v-slot:prepend>
                <div class="pe-4">
                <v-icon color="primary" size="x-large"></v-icon>
                </div>
            </template>

            <template v-slot:append>
                <v-progress-circular
                color="primary"
                indeterminate="disable-shrink"
                size="16"
                width="2"
                ></v-progress-circular>
            </template>
            </v-list-item>
        </v-list>
    </v-dialog>
</template>

<script setup>

let props = defineProps({
    dialog: {
        type: Boolean
    },
    icon: {
        type: String
    },
    message: {
        type: String
    }
})

</script>