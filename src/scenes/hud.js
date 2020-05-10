import { Container } from '../engine.js';
import { createToggleFullScreenButton, createVolumeSwitcher } from './common.js';


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
