import simple from './skins/simple/simple.json';
import bm from './skins/british-museum/british-museum.json';

const currentSkinIndex = 0;
export const SKINS = [simple, bm];
export function getCurrentSkin() {
    return SKINS[currentSkinIndex];
}
