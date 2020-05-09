import { Container } from '../engine.js';
import { STATES } from '../state-machine.js';
import { ASSETS, CreateSprite } from '../sprites.js';
import { showNotification } from '../overlay.js'
import { createToggleFullScreenButton } from './common.js';

export function createMenuScene({ stateMachine }) {
    const container = new Container();
    function createMenu({ gameRunning }) {
        container.removeChildren();
        container.addChild(CreateSprite({ asset: ASSETS.PLATE }));

        function createButton({ asset, action, position }) {
            const buttonSprite = CreateSprite({ asset });
            buttonSprite.interactive = true;
            buttonSprite.buttonMode = true;
            buttonSprite.on('pointerdown', action);
            buttonSprite.position.set(position.x, position.y);
            container.addChild(buttonSprite);
        }

        if (gameRunning) {
            createButton({
                asset: ASSETS.NEW_GAME_BUTTON_SMALL,
                action: () => stateMachine.gotoState({ state: STATES.SETTINGS }),
                position: { x: 74, y: 355 },
            });
            createButton({
                asset: ASSETS.CONTINUE_BUTTON_SMALL,
                action: () => stateMachine.switchToState({ state: STATES.GAME }),
                position: { x: 104, y: 409 },
            });
        }
        else {
            createButton({
                asset: ASSETS.NEW_GAME_BUTTON,
                action: () => stateMachine.gotoState({ state: STATES.SETTINGS }),
                position: { x: 74, y: 355 },
            });
        }

        createButton({
            asset: ASSETS.SETTINGS_BUTTON,
            action: () => showNotification({ title: 'Here will be soon a skin switcher', parent: container }),
            position: { x: 420, y: 355 },
        });

        container.addChild(createToggleFullScreenButton());
    }

    return {
        container,
        switchTo() {
            const gameState = stateMachine.getState({ state: STATES.GAME });
            createMenu({ gameRunning: !!gameState?.game?.gameRunning });
        },
    };
}
