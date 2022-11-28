import { defineStore } from 'pinia'
import { ref } from 'vue'
import localization from '@/../config/localization.json'

export const useLocalizationStore = defineStore('localization', () => {
    const currentLanguage = ref(navigator.language.slice(0, 2))

    function getLocalWord(name) {
        return localization[currentLanguage.value][name]
    }

    return {
        currentLanguage,
        localization,
        getLocalWord
    }
})