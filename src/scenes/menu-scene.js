import { Container, Graphics, Text } from '../engine.js';
import { STATES } from '../state-machine.js';

export function createMenuScene({ stateMachine }) {
    const container = new Container();

    container.addChild(createButton({
        text: 'New Game',
        color: 0x66CCFF,
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

function createButton({ text, color, position, onClick }) {
    const background = new Graphics();
    background.beginFill(color);
    background.drawRect(0, 0, 165, 50);
    background.endFill();
    background.interactive = true;
    background.buttonMode = true;
    background.on('pointerdown', onClick);

    const buttonText = new Text(text);
    buttonText.position.set(
        background.width / 2 - buttonText.width / 2, 
        background.height / 2 - buttonText.height / 2, 
    );
    background.addChild(buttonText);
    background.position.set(position.x, position.y);
    
    return background;
}
