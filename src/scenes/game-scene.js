import { createBackgroundSprite } from '../board-renderer.js';
import { Container, Text } from '../engine.js';
import { STATES } from '../state-machine.js';
import { createButton } from './common.js';
import { TYPE } from '../player.js';
import { ASSETS, CreateSprite, changeSpriteTexture } from '../sprites.js';
import { layout } from '../layout.js';

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
        position: { x: 580, y: 190 },
        onClick: () => game.rollDice(),
        transparency: 0.25,
    });
    container.addChild(diceButton);

    const diceSprites = [
        CreateSprite({ asset: ASSETS.DICE_NULL }),
        CreateSprite({ asset: ASSETS.DICE_NULL }),
        CreateSprite({ asset: ASSETS.DICE_NULL }),
        CreateSprite({ asset: ASSETS.DICE_NULL }),
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
                currentPlayerIndicator.position.set(10, layout.currentPlayerIndicator.blackY);
            }
            else if (game.currentPlayer.type === TYPE.WHITE) {
                currentPlayerIndicator.position.set(10, layout.currentPlayerIndicator.whiteY);
            }

            if (game.currentPlayerRolled) {
                diceButton.visible = false;
            }
            else {
                diceButton.visible = true;
            }

            const dice = game.lastRoll;
            if (dice) {
                diceSprites.forEach((sprite, index) => {
                    sprite.visible = true;
                    changeSpriteTexture({ sprite, asset: dice[index] === 0 ? ASSETS.DICE_NULL : ASSETS.DICE_ONE });
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
