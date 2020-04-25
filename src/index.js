import { addAssets } from './sprites.js';
import { utils, Application, loader } from './engine.js';
import { CreateStateMachine } from './state-machine.js';
import { createButton } from './scenes/common.js';

console.log(`WebGL is supported by your browser: ${utils.isWebGLSupported()}`);

const body = document.querySelector('body');
const app = new Application({ 
    width: 640,
    height: 480,
    backgroundColor: 0xEEEEEE,
});
document.body.appendChild(app.view);

addAssets({ loader })
    .on('progress', (loader, resource) => {
        console.log(`loading ${resource.url}`);
        console.log(`progress: ${loader.progress}%`);
    })
    .load(() => {
        app.stage.addChild(createButton({
            text: 'Fullscreen',
            color: 0xFF00FF,
            position: { x: 450, y: 30 },
            onClick: () => body.requestFullscreen(),
        }));
        CreateStateMachine({ app });
    });
