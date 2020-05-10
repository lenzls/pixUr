import menuMusic from './skins/british-museum/sfx/menu-music.ogg';
import { sound } from './engine.js';

export function play(key, config = { loop: true }) {
    sound.play(key, config);
}

export function addAssets({ loader }) {
    return loader
        .add('menu-music', menuMusic);
}
