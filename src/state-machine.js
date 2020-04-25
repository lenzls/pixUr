import { CreateGame } from './game.js';
import { createGameScene } from './scenes/game-scene.js';
import { createMenuScene } from './scenes/menu-scene.js';

function CreateMenuState(config) {
    return {
        container: createMenuScene(config),
        update() {},
    };
}
function CreateGameState(config) {
    const game = CreateGame();
    return {
        container: createGameScene({ game, ...config }),
        update() {
            game.update();
        },
    };
}

export const STATES = {
    MENU: 'menu',
    GAME: 'game',
};


export function CreateStateMachine({ app }) {
    const stateInstances = {};
    let currentState = null;
    const stateMachine = {
        createScenes() {},
        startNewState({ state }) {
            if (stateInstances[state]) app.stage.removeChild(stateInstances[state].container);
            if (state === STATES.MENU) stateInstances[state] = CreateMenuState({ app, stateMachine: this});
            if (state === STATES.GAME) stateInstances[state] = CreateGameState({ stateMachine: this });
            app.stage.addChild(stateInstances[state].container);
            this.switchToState({ state: state });
        },
        switchToState({ state }) {
            if (stateInstances[currentState]) app.ticker.remove(stateInstances[currentState].update);
            currentState = state;
            if (stateInstances[currentState]) app.ticker.add(stateInstances[currentState].update);
            if (stateInstances[STATES.MENU]) {
                stateInstances[STATES.MENU].container.visible = currentState === STATES.MENU;
            }
            if (stateInstances[STATES.GAME]) {
                stateInstances[STATES.GAME].container.visible = currentState === STATES.GAME;
            }
        },
    };
    stateMachine.startNewState({ state: STATES.MENU });
    return stateMachine;
}
