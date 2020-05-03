import { Graphics, Text } from './engine.js';


export function showNotification({ title, container }) {
    const background = new Graphics();
    background.beginFill(0xff00ff, 0.1);
    background.drawRect(0, 0, container.width, container.height);
    background.endFill();
    background.interactive = true;

    const buttonText = new Text(title);

    const box = new Graphics();
    box.beginFill(0xff00ff, 0.7);
    box.drawRect(0, 0, buttonText.width + 20, buttonText.height + 10);
    box.endFill();
    box.interactive = true;
    box.buttonMode = true;
    box.on('pointerdown', () => container.removeChild(background));

    box.addChild(buttonText);
    background.addChild(box);
    container.addChild(background);

    centerElement({ element: buttonText, container: box });
    centerElement({ element: box, container });
}

function centerElement({ container, element }) {
    element.position.set(
        container.width / 2 - element.width / 2,
        container.height / 2 - element.height / 2,
    );
}
