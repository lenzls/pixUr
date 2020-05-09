import { Container, Graphics, Text } from '../engine.js';
import { parentElement } from '../index.js';

export function createBoxButton({ text, color, position, onClick, transparency = 0.8 }) {
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

export function createSelect({ options, color, position }) {
    const select = {
        selectedIndex: 0,
        container: new Container(),
        next() {
            this.selectedIndex = (this.selectedIndex + 1) % options.length;
            this.render();
        },
        render() {
            const selected = options[this.selectedIndex];

            this.container.removeChildren();
            this.container.addChild(createBoxButton({
                text: selected.text,
                color,
                position,
                onClick: () => this.next(),
            }));
        },
    };
    select.render();
    return select;
}

export const createToggleFullScreenButton = () => createBoxButton({
    text: '⛶',
    color: 0xeec39a,
    position: { x: 585, y: 10 },
    onClick: () => toggleFullscreen({ element: parentElement }),
    transparency: 0.25,
});

function toggleFullscreen({ element }) {
    if (document.fullscreenElement) {
        document.exitFullscreen();
    }
    else {
        element.requestFullscreen();
    }
}
