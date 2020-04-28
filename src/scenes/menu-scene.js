import { Container } from '../engine.js';
import { STATES } from '../state-machine.js';
import { createButton } from './common.js';
import { ASSETS, CreateSprite } from '../sprites.js';

export function createMenuScene({ stateMachine }) {
    const container = new Container();

    container.addChild(CreateSprite({ asset: ASSETS.PLATE }));
    const newGameButtonSprite = CreateSprite({ asset: ASSETS.NEW_GAME_BUTTON });
    newGameButtonSprite.interactive = true;
    newGameButtonSprite.buttonMode = true;
    newGameButtonSprite.on('pointerdown', () => stateMachine.startNewState({ state: STATES.GAME }));
    newGameButtonSprite.position.set(60, 355);
    container.addChild(newGameButtonSprite);


    container.addChild(createButton({
        text: 'Continue',
        color: 0x66CCFF,
        position: { x: 420, y: 355 },
        onClick: () => stateMachine.switchToState({ state: STATES.GAME }),
    }));
    return container;
}
