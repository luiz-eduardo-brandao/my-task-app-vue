<template>
    <v-dialog 
        v-model="props.isTimelineOpen"
        min-width="600"
        width="auto"
        max-height="600"
        flat
        class="rounded-md border-2"
    >
        <v-card>
            <v-card-title class="mt-2">
                <v-row justify="center" class="pa-2">
                    <span align="center" class="font-weight-light text-grey text-h6">Timeline: </span>
                    <v-spacer></v-spacer>
                    <v-btn icon="mdi-close" size="small" variant="outlined" @click="$emit('close')"></v-btn>
                </v-row>
            </v-card-title>
            <v-card-text>
                <v-timeline align="start" side="end">
                    <v-timeline-item
                        v-for="item in projectTimeline"
                        :key="item.id"
                        dot-color="blue"
                        size="small"
                    >
                        <v-card class="pa-4 rounded-md border">
                            <div class="d-flex font-weight-light mb-3">
                                <div class="d-flex flex-column">
                                    <span class="me-4">{{ item.date }}</span>
                                    <span class="me-4 font-weight-light">{{ item.hour }}</span>
                                </div>
                                <div>
                                <strong>{{ item.action }}</strong>
                                <div class="text-caption">
                                    {{ item.title }}
                                </div>
                                </div>
                            </div>
                        </v-card>
                    </v-timeline-item>
                </v-timeline>
            </v-card-text>
            <v-card-actions>
                <v-btn 
                    color="secondary" 
                    variant="tonal" 
                    @click="$emit('close')"
                    class="ma-3"
                >Fechar</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script setup>

let props = defineProps({
    isTimelineOpen: {
        type: Boolean
    },
    projectTimeline: {
        type: Array
    },
})

</script>