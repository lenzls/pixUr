import { Container } from '../engine.js';
import { STATES } from '../state-machine.js';
import { ASSETS, CreateSprite } from '../sprites.js';
import { toggleFullScreenButton } from './common.js';

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
        asset: ASSETS.BACK_BUTTON,
        action: () => stateMachine.switchToState({ state: STATES.MENU }),
        position: { x: 74, y: 355 },
    });

    container.addChild(toggleFullScreenButton);

    return {
        container,
    };
}
