import { createBackgroundSprite } from '../board-renderer.js';
import { Container } from '../engine.js';
import { STATES } from '../state-machine.js';
import { createButton } from './common.js';

export function createGameScene({ stateMachine, game }) {
    const container = new Container();
        
    container.addChild(createBackgroundSprite());
    [
        ...game.white.pieces.map(p => p.sprite), 
        ...game.black.pieces.map(p => p.sprite)
    ]
        .forEach(sprite => {
            container.addChild(sprite);
            sprite.interactive = true;
            sprite.on('pointerdown', (event) => {
                game.moveAttempt({ piece: event.target.piece });
            });
        });

    container.addChild(createButton({
        text: 'Main Menu',
        color: 0x66CC66,
        position: { x: 450, y: 405 },
        onClick: () => stateMachine.switchToState({ state: STATES.MENU }),
    }));

    return container;
}
