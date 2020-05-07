import { Container } from '../engine.js';
import { STATES } from '../state-machine.js';
import { ASSETS, CreateSprite } from '../sprites.js';

export function createMenuScene({ stateMachine }) {
    const container = new Container();
    function createMenu({ gameRunning }) {
        container.removeChildren();
        container.remove
        container.addChild(CreateSprite({ asset: ASSETS.PLATE }));

        const continueButtonSprite = CreateSprite({ asset: ASSETS.CONTINUE_BUTTON });
        continueButtonSprite.interactive = true;
        continueButtonSprite.buttonMode = true;
        continueButtonSprite.on('pointerdown', () => stateMachine.switchToState({ state: STATES.GAME }));
        continueButtonSprite.position.set(420, 355);
        container.addChild(continueButtonSprite);

        let newGameButtonSprite = null;
        if (gameRunning) {
            newGameButtonSprite = CreateSprite({ asset: ASSETS.NEW_GAME_BUTTON_SMALL });
        }
        else {
            newGameButtonSprite = CreateSprite({ asset: ASSETS.NEW_GAME_BUTTON });
        }
        newGameButtonSprite.interactive = true;
        newGameButtonSprite.buttonMode = true;
        newGameButtonSprite.on('pointerdown', () => stateMachine.startNewState({ state: STATES.GAME }));
        newGameButtonSprite.position.set(74, 355);
        container.addChild(newGameButtonSprite);

    }

    return {
        container,
        switchTo() {
            const game = stateMachine.getState({ state: STATES.GAME });
            createMenu({ gameRunning: !!game?.game?.gameRunning });
        },
    };
}
