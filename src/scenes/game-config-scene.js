import { Container } from '../engine.js';
import { STATES } from '../state-machine.js';
import { ASSETS, CreateSprite } from '../sprites.js';
import { createToggleFullScreenButton, createSelect, createSpriteButton } from './common.js';
import { ACTOR_TYPE } from '../player/player.js';

export function createGameConfigScene({ stateMachine }) {
    const container = new Container();
    container.addChild(CreateSprite({ asset: ASSETS.PLATE }));

    container.addChild(createSpriteButton({
        asset: ASSETS.NEW_GAME_BUTTON,
        action: () => {
            stateMachine.startNewGame({
                whiteActorType: white.value,
                blackActorType: black.value,
            });
        },
        position: { x: 74, y: 355 },
    }));
    container.addChild(createSpriteButton({
        asset: ASSETS.BACK_BUTTON,
        action: () => stateMachine.gotoState({ state: STATES.MENU }),
        position: { x: 420, y: 355 },
    }));

    const white = createSelect({
        options: [
            { text: 'White: Human', value: ACTOR_TYPE.HUMAN },
            { text: 'White: AI', value: ACTOR_TYPE.AI },
        ],
        color: 0xded6d5,
        position: { x: 400, y: 150 },
    });
    container.addChild(white.container);
    const black = createSelect({
        options: [
            { text: 'Black: AI', value: ACTOR_TYPE.AI },
            { text: 'Black: Human', value: ACTOR_TYPE.HUMAN },
        ],
        color: 0x7b8d9c,
        position: { x: 400, y: 220 },
    });
    container.addChild(black.container);

    container.addChild(createToggleFullScreenButton());

    return {
        container,
    };
}
