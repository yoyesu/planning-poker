import {router} from "./view-router.js";

export const NAME_KEY = 'myName';
export default function getSavedName() {
    return localStorage.getItem(NAME_KEY);
}

export function saveName(name) {
    localStorage.setItem(NAME_KEY, name);
}

export function promptNameSavingAndRedirect() {
    if (!getSavedName()) {
        const currentPath = router.currentRoute.value.fullPath;
        router.push(`/your-name?redirect=${encodeURIComponent(currentPath)}`);
    }
}