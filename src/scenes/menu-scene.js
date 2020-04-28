import { Container } from '../engine.js';
import { STATES } from '../state-machine.js';
import { ASSETS, CreateSprite } from '../sprites.js';

export function createMenuScene({ stateMachine }) {
    const container = new Container();

    container.addChild(CreateSprite({ asset: ASSETS.PLATE }));

    const newGameButtonSprite = CreateSprite({ asset: ASSETS.NEW_GAME_BUTTON });
    newGameButtonSprite.interactive = true;
    newGameButtonSprite.buttonMode = true;
    newGameButtonSprite.on('pointerdown', () => stateMachine.startNewState({ state: STATES.GAME }));
    newGameButtonSprite.position.set(74, 355);
    container.addChild(newGameButtonSprite);
    
    const continueButtonSprite = CreateSprite({ asset: ASSETS.CONTINUE_BUTTON });
    continueButtonSprite.interactive = true;
    continueButtonSprite.buttonMode = true;
    continueButtonSprite.on('pointerdown', () => stateMachine.switchToState({ state: STATES.GAME }));
    continueButtonSprite.position.set(420, 355);
    container.addChild(continueButtonSprite);

    return container;
}
