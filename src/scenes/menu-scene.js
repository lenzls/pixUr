import { Container } from '../engine.js';
import { STATES } from '../state-machine.js';
import { createButton } from './common.js';

export function createMenuScene({ stateMachine }) {
    const container = new Container();

    container.addChild(createButton({
        text: 'New Game',
        color: 0xAAAAFF,
        position: { x: 130, y: 300 },
        onClick: () => stateMachine.startNewState({ state: STATES.GAME }),
    }));
    container.addChild(createButton({
        text: 'Continue',
        color: 0x66CCFF,
        position: { x: 330, y: 300 },
        onClick: () => stateMachine.switchToState({ state: STATES.GAME }),
    }));
    return container;
}
