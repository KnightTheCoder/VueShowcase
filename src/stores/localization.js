import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import localization from '@/../config/localization.json'
import { useLocalStorage } from '@/composables/localStorage'

export const useLocalizationStore = defineStore('localization', () => {
    const localizationStorage = useLocalStorage('language')

    const defaultValue = localizationStorage.get() == null ? navigator.language.slice(0, 2) : localizationStorage.get()

    const currentLanguage = ref(defaultValue)

    watch(
        currentLanguage,
        (value) => localizationStorage.set(value)
    )

    function getLocalWord(name) {
        return localization[currentLanguage.value][name]
    }

    return {
        currentLanguage,
        localization,
        getLocalWord
    }
})