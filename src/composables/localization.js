import { ref } from 'vue'
import localization from '@/../config/localization.json'

export function UseLocalization() {
    const currentLanguage = ref(navigator.language.slice(0, 2))

    function getLocalWord(name) {
        return localization[currentLanguage.value][name]
    }

    return {
        currentLanguage,
        localization,
        getLocalWord
    }
}