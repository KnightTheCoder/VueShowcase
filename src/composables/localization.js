export function UseLocalization() {
    async function loadLocalization() {
        const resp = await fetch('/config/localization.json')
        return await resp.json()
    }

    return {
        loadLocalization
    }
}