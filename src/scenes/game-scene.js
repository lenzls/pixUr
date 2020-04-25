import { createBackgroundSprite } from '../board-renderer.js';
import { Container, Text, Sprite, loader } from '../engine.js';
import { STATES } from '../state-machine.js';
import { createButton } from './common.js';
import { TYPE } from '../player.js';
import { ASSETS } from '../sprites.js';

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

    const diceButton = createButton({
        text: '⚄',
        color: 0x66CC66,
        position: { x: 450, y: 25 },
        onClick: () => game.rollDice(),
        transparency: 0.25,
    });
    container.addChild(diceButton);

    const diceSprites = [
        new Sprite(loader.resources[ASSETS.DICE_NULL].texture),
        new Sprite(loader.resources[ASSETS.DICE_NULL].texture),
        new Sprite(loader.resources[ASSETS.DICE_NULL].texture),
        new Sprite(loader.resources[ASSETS.DICE_NULL].texture),
    ];
    diceSprites.forEach((sprite, index) => {
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
            if (game.currentPlayer.type === TYPE.BLACK) {
                currentPlayerIndicator.position.set(10, 300);
            }
            else if (game.currentPlayer.type === TYPE.WHITE) {
                currentPlayerIndicator.position.set(10, 100);
            }

            if (game.currentPlayer.currentRoll) {
                diceButton.visible = false;
            }
            else {
                diceButton.visible = true;
            }

            const dice = game.currentPlayer.currentRoll;
            if (dice) {
                diceSprites.forEach((sprite, index) => {
                    sprite.visible = true;
                    sprite.texture = dice[index] === 0 ? loader.resources[ASSETS.DICE_NULL].texture : loader.resources[ASSETS.DICE_ONE].texture;
                });
            }
            else {
                diceSprites.forEach((sprite) => {
                    sprite.visible = false;
                });
            }
        }
    };
}
