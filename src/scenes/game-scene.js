import { CreateGame } from '../game.js';
import { createBackgroundSprite } from '../board-renderer.js';
import { Container } from '../engine.js';

export function createGameScene() {
    const container = new Container();

    const game = CreateGame();
        
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
