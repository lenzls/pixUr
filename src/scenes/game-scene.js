import { createBackgroundSprite } from '../board-renderer.js';
import { Container, Text } from '../engine.js';
import { STATES } from '../state-machine.js';
import { createButton } from './common.js';
import { TYPE } from '../player.js';

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

    const currentPlayerIndicator = new Text('→');
    container.addChild(currentPlayerIndicator);

    container.addChild(createButton({
        text: '☰',
        color: 0x66CC66,
        position: { x: 535, y: 10 },
        onClick: () => stateMachine.switchToState({ state: STATES.MENU }),
        transparency: 0.25,
    }));

    return {
        container,
        update() {
            if (game.currentPlayer.type === TYPE.BLACK) {
                currentPlayerIndicator.position.set(10, 300);
            }
            else if (game.currentPlayer.type === TYPE.WHITE) {
                currentPlayerIndicator.position.set(10, 100);
            }
        }
    };
}
