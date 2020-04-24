import { CreateGame } from './game.js';
import { addAssets } from './sprites.js';
import { utils, Application, Container, loader } from './engine.js';


console.log(`WebGL is supported by your browser: ${utils.isWebGLSupported()}`);

const app = new Application({ width: 256, height: 256 });
document.body.appendChild(app.view);


const menuScene = new Container();
const gameScene = new Container();

const state = play;

let game;

function play(delta) {
    game.update();
}

addAssets({ loader })
    .on('progress', (loader, resource) => {
        console.log(`loading ${resource.url}`);
        console.log(`progress: ${loader.progress}%`);
    })
    .load(() => {
        menuScene.visible = false;
        gameScene.visible = true;

        game = CreateGame();

        [
            ...game.white.pieces.map(p => p.sprite), 
            ...game.black.pieces.map(p => p.sprite)
        ]
            .forEach(sprite => {
                gameScene.addChild(sprite);
                sprite.interactive = true;
                sprite.on('click', (event) => {
                    console.log(event.target.player);
                });
            });

        app.stage.addChild(menuScene);
        app.stage.addChild(gameScene);

        app.ticker.add(state);
    });
