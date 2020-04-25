import { createGameScene } from './scenes/game-scene.js';
import { createMenuScene } from './scenes/menu-scene.js';

function CreateMenu(config) {
    return {
        container: createMenuScene(config),
        update() {},
    };
}
function CreateGame() {
    return {
        container: createGameScene(),
        update() {},
    };
}

export const STATES = {
    MENU: 'menu',
    GAME: 'game',
};


export function CreateStateMachine({ app }) {
    const stateInstances = {};
    let currentState = STATES.MENU;

    return {
        createScenes() {},
        startNewState({ state }) {
            if (stateInstances[state]) app.stage.removeChild(stateInstances[state].container);
            if (state === STATES.MENU) stateInstances[state] = CreateMenu({ app, stateMachine: this});
            if (state === STATES.GAME) stateInstances[state] = CreateGame();
            app.stage.addChild(stateInstances[state].container);
            this.switchToState({ state: state });
        },
        switchToState({ state }) {
            this.currentState = state;
            if (stateInstances[STATES.MENU]) {
                stateInstances[STATES.MENU].container.visible = this.currentState === STATES.MENU;
            }
            if (stateInstances[STATES.GAME]) {
                stateInstances[STATES.GAME].container.visible = this.currentState === STATES.GAME;
            }
        },
        updateFunction: currentState.update,
    };
}
