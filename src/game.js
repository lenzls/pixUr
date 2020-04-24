import black from './assets/graphics/black.png';
import white from './assets/graphics/white.png';

import * as PIXI from 'pixi.js';

console.log(`WebGL is supported by your browser: ${PIXI.utils.isWebGLSupported()}`);

const app = new PIXI.Application({ width: 256, height: 256 });
document.body.appendChild(app.view);

const loader = PIXI.Loader.shared;
const Sprite = PIXI.Sprite;
const Container = PIXI.Container;

const whitePieces = [];
const blackPieces = [];

const menuScene = new Container();
const gameScene = new Container();

const state = play;

function play(delta) {
    whitePieces.forEach(sprite => sprite.x += 1 * delta);
}

loader
    .add(black)
    .add(white)
    .on('progress', (loader, resource) => {
        console.log(`loading ${resource.url}`);
        console.log(`progress: ${loader.progress}%`);
    })
    .load(() => {
        menuScene.visible = false;
        gameScene.visible = true;

        whitePieces.push(new Sprite(loader.resources[white].texture));
        blackPieces.push(new Sprite(loader.resources[black].texture));
        
        [...whitePieces, ...blackPieces].forEach(sprite => gameScene.addChild(sprite));

        app.stage.addChild(menuScene);
        app.stage.addChild(gameScene);

        app.ticker.add(state);
    });
