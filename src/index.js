import { addAssets } from './sprites.js';
import { utils, Application, loader } from './engine.js';
import { CreateStateMachine, STATES } from './state-machine.js';


console.log(`WebGL is supported by your browser: ${utils.isWebGLSupported()}`);

const app = new Application({ 
    width: 640,
    height: 480,
    backgroundColor: 0xEEEEEE,
});
document.body.appendChild(app.view);


function play(delta) {
    game.update();
}

addAssets({ loader })
    .on('progress', (loader, resource) => {
        console.log(`loading ${resource.url}`);
        console.log(`progress: ${loader.progress}%`);
    })
    .load(() => {
        const stateMachine = CreateStateMachine({ app });
        
        stateMachine.startNewState({ state: STATES.MENU });

        app.ticker.add(stateMachine.updateFunction);
    });
