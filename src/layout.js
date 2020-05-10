import simple from './skins/simple/simple.json';
import bm from './skins/british-museum/british-museum.json';

let skinChangeListeners = [];

export function registerSkinChangeListener(listener) {
    skinChangeListeners.push(listener);
}

export let currentSkinIndex = 0;
export function setCurrentSkin(index) {
    currentSkinIndex = index;
    skinChangeListeners.forEach(listener => listener.fnc(listener.arg));
}
export const SKINS = [simple, bm];
export function getCurrentSkin() {
    return SKINS[currentSkinIndex];
}
