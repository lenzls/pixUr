import { Container } from '../engine.js';
import { STATES } from '../state-machine.js';
import { ASSETS, CreateSprite } from '../sprites.js';
import { showNotification } from '../overlay.js'
import { play } from '../sounds.js';
import { currentSkinIndex, setCurrentSkin } from '../layout.js';
import { createSelect, createSpriteButton } from './common.js';
import { changeBackgroundMusic } from '../sounds.js';

export function createMenuScene({ stateMachine }) {
    const container = new Container();
    function createMenu({ gameRunning }) {
        container.removeChildren();
        container.addChild(CreateSprite({ asset: ASSETS.PLATE }));

        if (gameRunning) {
            container.addChild(createSpriteButton({
                asset: ASSETS.NEW_GAME_BUTTON_SMALL,
                action: () => stateMachine.gotoState({ state: STATES.GAME_CONFIG }),
                position: { x: 74, y: 355 },
            }));
            container.addChild(createSpriteButton({
                asset: ASSETS.CONTINUE_BUTTON_SMALL,
                action: () => stateMachine.switchToState({ state: STATES.GAME }),
                position: { x: 104, y: 409 },
            }));
        }
        else {
            container.addChild(createSpriteButton({
                asset: ASSETS.NEW_GAME_BUTTON,
                action: () => stateMachine.gotoState({ state: STATES.GAME_CONFIG }),
                position: { x: 74, y: 355 },
            }));
        }

        container.addChild(createSelect({
            options: [
                { value: 0, asset: ASSETS.SKIN_SIMPLE_BUTTON },
                { value: 1, asset: ASSETS.SKIN_BM_BUTTON },
            ],
            color: 0x7b8d9c,
            position: { x: 420, y: 355 },
            onSelect: (value) => setCurrentSkin(value),
            initialSelection: currentSkinIndex,
        }).container);
    }

    return {
        container,
        switchTo() {
            const gameState = stateMachine.getState({ state: STATES.GAME });
            createMenu({ gameRunning: !!gameState?.game?.gameRunning });
            changeBackgroundMusic('menu-music');
        },
    };
}
