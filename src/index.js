import { addAssets } from './sprites.js';
import { utils, Application, loader } from './engine.js';
import { CreateStateMachine } from './state-machine.js';
import { createButton } from './scenes/common.js';
import { resize } from './resizer.js';

console.log(`WebGL is supported by your browser: ${utils.isWebGLSupported()}`);

export const DIMENSIONS = {
    width: 640,
    height: 480,
};

const parentElement = document.querySelector('#canvas-parent');
const app = new Application({
    ...DIMENSIONS,
    backgroundColor: 0xffffff,
});
parentElement.appendChild(app.view);

resize(app)();
window.addEventListener('resize', resize(app));

addAssets({ loader })
    .on('progress', (loader, resource) => {
        console.log(`loading ${resource.url}`);
        console.log(`progress: ${loader.progress}%`);
    })
    .load(() => {
        app.stage.addChild(createButton({
            text: '⛶',
            color: 0xeec39a,
            position: { x: 585, y: 10 },
            onClick: () => toggleFullscreen({ element: parentElement }),
            transparency: 0.25,
        }));
        CreateStateMachine({ app });
    });

function toggleFullscreen({ element }) {
    if (document.fullscreenElement) {
        document.exitFullscreen();
    }
    else {
        element.requestFullscreen();
    }
}
