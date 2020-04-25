import { Graphics, Text } from '../engine.js';

export function createButton({ text, color, position, onClick }) {
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
