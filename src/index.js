import { addAssets as addSprites } from './sprites.js';
import { addAssets as addSounds } from './sounds.js';
import { utils, Application, loader } from './engine.js';
import { CreateStateMachine } from './state-machine.js';
import { resize } from './resizer.js';

console.log(`WebGL is supported by your browser: ${utils.isWebGLSupported()}`);

export const DIMENSIONS = {
    width: 640,
    height: 480,
};

export const parentElement = document.querySelector('#canvas-parent');
const app = new Application({
    ...DIMENSIONS,
    backgroundColor: 0xffffff,
});
parentElement.appendChild(app.view);

resize(app)();
window.addEventListener('resize', resize(app));

addSounds({ loader });
addSprites({ loader });
loader
    .on('progress', (loader, resource) => {
        console.log(`loading ${resource.url}`);
        console.log(`progress: ${loader.progress}%`);
    })
    .load(() => {
        CreateStateMachine({ app });
    });
