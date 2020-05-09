import simple from './skins/simple/simple.json';
import bm from './skins/british-museum/british-museum.json';

export let currentSkinIndex = 0;
export function setCurrentSkin(index) {
    currentSkinIndex = index;
}
export const SKINS = [simple, bm];
export function getCurrentSkin() {
    return SKINS[currentSkinIndex];
}
