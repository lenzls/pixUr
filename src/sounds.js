import menuMusic from './skins/british-museum/sfx/menu-music.ogg';
import fiestMusic from './skins/british-museum/sfx/fiest.ogg';
import { sound } from './engine.js';

export function play(key, config) {
    sound.play(key, config);
}

export function addAssets({ loader }) {
    return loader
        .add('menu-music', menuMusic)
        .add('fiest-music', fiestMusic);
}

export function changeBackgroundMusic(key, config = { loop: true }) {
    sound.stopAll();
    play(key, config);
}

export function setMasterVolume(volume) {
    sound.volumeAll = volume;
}
