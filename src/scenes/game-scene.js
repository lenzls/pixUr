import { Container, Text } from '../engine.js';
import { STATES } from '../state-machine.js';
import { createButton } from './common.js';
import { COLOUR } from '../player/player.js';
import { getCurrentSkin } from '../layout.js';

export function createGameScene({ stateMachine, game }) {
    const container = new Container();

    container.addChild(game.board.sprite);
    [
        ...game.white.pieces.map(p => p.sprite),
        ...game.black.pieces.map(p => p.sprite),
    ]
        .forEach(sprite => {
            container.addChild(sprite);
            sprite.interactive = true;
            sprite.on('pointerdown', (event) => {
                game.currentPlayer.actor.touchPiece({ piece: event.target.piece });
            });
        });

    const currentPlayerIndicator = new Text('→');
    container.addChild(currentPlayerIndicator);

    const diceButton = createButton({
        text: '⚄',
        color: 0x66CC66,
        position: { x: 580, y: 190 },
        onClick: () => game.currentPlayer.actor.touchDice(),
        transparency: 0.25,
    });
    container.addChild(diceButton);

    game.dice.map(die => die.sprite).forEach((sprite, index) => {
        sprite.position.set(570, 115 + 50 * index);
        container.addChild(sprite);
    });

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
            if (game.currentPlayer.colour === COLOUR.BLACK) {
                currentPlayerIndicator.position.set(10, getCurrentSkin().currentPlayerIndicator.blackY);
            }
            else if (game.currentPlayer.colour === COLOUR.WHITE) {
                currentPlayerIndicator.position.set(10, getCurrentSkin().currentPlayerIndicator.whiteY);
            }

            if (game.currentPlayerRolled) {
                diceButton.visible = false;
            }
            else {
                diceButton.visible = true;
            }
        },
    };
}
