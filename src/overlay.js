import { Container, Graphics, Text, TextStyle } from './engine.js';
import { DIMENSIONS } from './index.js';

export function showNotification({ title, parent }) {
    const container = new Container();

    const background = new Graphics();
    background.beginFill(0xc5a573, 0.3);
    background.drawRect(0, 0, DIMENSIONS.width, DIMENSIONS.height);
    background.endFill();
    background.interactive = true;

    const style = new TextStyle({
        fill: '#f6eacd',
        fontFamily: 'Georgia',
        fontSize: 38,
    });
    const buttonText = new Text(title, style);

    const box = new Graphics();
    box.beginFill(0x738db4, 0.9);
    box.drawRect(0, 0, buttonText.width + 160, buttonText.height + 80);
    box.endFill();
    box.interactive = true;
    box.buttonMode = true;
    box.on('pointerdown', () => parent.removeChild(container));

    box.addChild(buttonText);
    background.addChild(box);
    container.addChild(background);
    parent.addChild(container);

    centerElement({ element: buttonText, container: box });
    centerElement({ element: box, container });
}

function centerElement({ container, element }) {
    element.position.set(
        container.width / 2 - element.width / 2,
        container.height / 2 - element.height / 2,
    );
}
