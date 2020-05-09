import { Container } from '../engine.js';
import { STATES } from '../state-machine.js';
import { ASSETS, CreateSprite } from '../sprites.js';
import { createToggleFullScreenButton, createSelect } from './common.js';

export function createSettingsScene({ stateMachine }) {
    const container = new Container();
    container.addChild(CreateSprite({ asset: ASSETS.PLATE }));

    function createButton({ asset, action, position }) {
        const buttonSprite = CreateSprite({ asset });
        buttonSprite.interactive = true;
        buttonSprite.buttonMode = true;
        buttonSprite.on('pointerdown', action);
        buttonSprite.position.set(position.x, position.y);
        container.addChild(buttonSprite);
    }

    createButton({
        asset: ASSETS.NEW_GAME_BUTTON,
        action: () => {
            console.log(select.selectedIndex);
            stateMachine.startNewGame();
        },
        position: { x: 74, y: 355 },
    });
    createButton({
        asset: ASSETS.BACK_BUTTON,
        action: () => stateMachine.gotoState({ state: STATES.MENU }),
        position: { x: 420, y: 355 },
    });

    const select = createSelect({
        options: [
            { text: 'White: AI' },
            { text: 'White: Human' },
        ],
        color: 0xff00ff,
        position: { x: 330, y: 200 },
    });
    container.addChild(select.container);

    container.addChild(createToggleFullScreenButton());

    return {
        container,
    };
}
