import { CreateGame } from './game.js';
import { addAssets } from './sprites.js';
import { createBackgroundSprite } from './board-renderer.js';
import { utils, Application, Container, Graphics, Text, loader } from './engine.js';


console.log(`WebGL is supported by your browser: ${utils.isWebGLSupported()}`);

const app = new Application({ 
    width: 640,
    height: 480,
    backgroundColor: 0xEEEEEE,
});
document.body.appendChild(app.view);


let menuScene;
let gameScene;

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
        menuScene = createMenuScene();
        gameScene = createGameScene();
        
        app.stage.addChild(menuScene);
        app.stage.addChild(gameScene);

        switchToMenu();

        app.ticker.add(state);
    });

function switchToMenu() {
    menuScene.visible = true;
    gameScene.visible = false;
}
function switchToGame() {
    menuScene.visible = false;
    gameScene.visible = true;
}

function createGameScene() {
    const container = new Container();

    game = CreateGame();
        
    container.addChild(createBackgroundSprite());
    [
        ...game.white.pieces.map(p => p.sprite), 
        ...game.black.pieces.map(p => p.sprite)
    ]
        .forEach(sprite => {
            container.addChild(sprite);
            sprite.interactive = true;
            sprite.on('click', (event) => {
                game.moveAttempt({ piece: event.target.piece });
            });
        });

    return container;
}

function createMenuScene() {
    const container = new Container();
    const START_GAME_BUTTON_POS = { x: 230, y: 300 };

    const startGameButton = new Graphics();
    startGameButton.beginFill(0x66CCFF);
    startGameButton.drawRect(0, 0, 165, 50);
    startGameButton.endFill();
    startGameButton.interactive = true;
    startGameButton.buttonMode = true;
    startGameButton.on('pointerdown', (e) => switchToGame());

    const buttonText = new Text('Start Game');
    buttonText.position.set(15, 12);
    startGameButton.addChild(buttonText);
    startGameButton.position.set(START_GAME_BUTTON_POS.x, START_GAME_BUTTON_POS.y);
    container.addChild(startGameButton);
    return container;
}
