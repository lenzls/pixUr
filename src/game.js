import { addAssets } from './sprites.js';

import { CreateWhitePlayer, CreateBlackPlayer } from './player.js';
import { utils, Application, Container, loader } from './engine.js';



console.log(`WebGL is supported by your browser: ${utils.isWebGLSupported()}`);

const app = new Application({ width: 256, height: 256 });
document.body.appendChild(app.view);


const menuScene = new Container();
const gameScene = new Container();

const state = play;

function play(delta) {
    // whitePieces.forEach(sprite => sprite.x += 1 * delta);
}

addAssets({ loader })
    .on('progress', (loader, resource) => {
        console.log(`loading ${resource.url}`);
        console.log(`progress: ${loader.progress}%`);
    })
    .load(() => {
        menuScene.visible = false;
        gameScene.visible = true;

        const white = CreateWhitePlayer();
        const black = CreateBlackPlayer();
        
        [...white.pieceSprites, ...black.pieceSprites].forEach(sprite => gameScene.addChild(sprite));

        app.stage.addChild(menuScene);
        app.stage.addChild(gameScene);

        app.ticker.add(state);
    });
