import {router} from "./view-router.js";
import {get} from "firebase/database";

export const NAME_KEY = 'myName';
function getSavedName() {
    return localStorage.getItem(NAME_KEY);
}

export function saveName(name) {
    localStorage.setItem(NAME_KEY, name);
}

export async function promptNameSavingAndRedirect() {
    const name = getSavedName();
    console.log(`Retrieved name: ${name}`);
    if (name === null) {
        const currentPath = router.currentRoute.value.fullPath;
        console.log(`Current path: ${currentPath}`);
        await router.push({
            path: `your-name`,
            query: {
                redirect: currentPath,
            }
        });
    }
}

export async function getFromDatabase(ref) {
    const snapshot = await get(ref);
    return snapshot.val();
}