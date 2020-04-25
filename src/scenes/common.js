import { Graphics, Text } from '../engine.js';

export function createButton({ text, color, position, onClick, transparency = 0.8 }) {
    const buttonText = new Text(text);
    
    const background = new Graphics();
    background.beginFill(color, transparency);
    background.drawRect(0, 0, buttonText.width + 20, buttonText.height + 10);
    background.endFill();
    background.interactive = true;
    background.buttonMode = true;
    background.on('pointerdown', onClick);

    
    buttonText.position.set(
        background.width / 2 - buttonText.width / 2, 
        background.height / 2 - buttonText.height / 2, 
    );
    background.addChild(buttonText);
    background.position.set(position.x, position.y);
    
    return background;
}
