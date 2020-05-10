import { Container } from '../engine.js';
import { createSelect, createBoxButton } from './common.js';
import { getMasterVolume, setMasterVolume } from '../sounds.js';
import { parentElement } from '../index.js';


export function createHud() {
    const container = new Container();

    const fullscreen = createToggleFullScreenButton();
    container.addChild(fullscreen);

    const volume = createVolumeSwitcher();
    container.addChild(volume);

    container.zIndex = 10;

    return {
        container,
    };
}

const volumeOptions = [
    { value: 1.0, text: '🔊' },
    { value: 0.6, text: '🔉' },
    { value: 0.3, text: '🔈' },
    { value: 0.0, text: '🔇' },
];

export const createVolumeSwitcher = () => createSelect({
    options: volumeOptions,
    color: 0x66CC66,
    position: { x: 535, y: 10 },
    onSelect: (value) => setMasterVolume(value),
    initialSelection: volumeOptions.findIndex(level => level.value === getMasterVolume())
}).container;

export const createToggleFullScreenButton = () => createBoxButton({
    text: '⛶',
    color: 0xeec39a,
    position: { x: 585, y: 10 },
    onClick: () => toggleFullscreen({ element: parentElement }),
    transparency: 0.25,
});

function toggleFullscreen({ element }) {
    if (document.fullscreenElement) {
        document.exitFullscreen();
    }
    else {
        element.requestFullscreen();
    }
}
