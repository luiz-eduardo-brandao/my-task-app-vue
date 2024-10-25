import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useSnackBarStore = defineStore('snackbar', () => {

    let time = ref(4000)
    let color = ref('success')
    let message = ref('Teste 2')
    let isOpen = ref(false)

    const setSnackBar = (request) => {
        time.value = request?.time ? request?.time : time.value
        color.value = request?.color ? request?.color : color.value
        message.value = request?.message ? request?.message : message.value

        isOpen.value = true

        setTimeout(() => isOpen.value = false, time.value)
    }

    const getIsOpen = () => isOpen.value
    const getTime = () => time.value
    const getColor = () => color.value
    const getMessage = () => message.value

    return {
        setSnackBar,
        getIsOpen,
        getTime,
        getColor,
        getMessage
    }
})