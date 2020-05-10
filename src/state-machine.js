import { CreateGame } from './game.js';
import { createGameScene } from './scenes/game-scene.js';
import { createMenuScene } from './scenes/menu-scene.js';
import { createGameConfigScene } from './scenes/game-config-scene.js';
import { createHud } from './scenes/hud.js';

function CreateMenuState(config) {
    const scene = createMenuScene(config);
    return {
        container: scene.container,
        switchTo: scene.switchTo,
        update() {},
    };
}
function CreateGameConfigState(config) {
    const scene = createGameConfigScene(config);
    return {
        container: scene.container,
        switchTo() {},
        update() {},
    };
}
function CreateGameState(config) {
    const game = CreateGame(config);
    const scene = createGameScene({ game, ...config });
    game.startGame();
    return {
        game,
        container: scene.container,
        switchTo: scene.switchTo,
        update() {
            scene.update();
        },
    };
}

export const STATES = {
    MENU: 'menu',
    GAME_CONFIG: 'gameConfig',
    GAME: 'game',
};


export function CreateStateMachine({ app }) {
    const stateInstances = {};
    let currentState = null;
    const stateMachine = {
        createScenes() {},
        startNewGame(config) {
            if (stateInstances[STATES.GAME]) stateInstances[STATES.GAME].game.abortRunningGame();
            this.startNewState({ state: STATES.GAME, config });
        },
        startNewState({ state, config }) {
            if (stateInstances[state]) app.stage.removeChild(stateInstances[state].container);
            if (state === STATES.MENU) stateInstances[state] = CreateMenuState({ stateMachine: this, config });
            if (state === STATES.GAME_CONFIG) stateInstances[state] = CreateGameConfigState({ stateMachine: this, config });
            if (state === STATES.GAME) stateInstances[state] = CreateGameState({ stateMachine: this, container: app.stage, config });
            app.stage.addChild(stateInstances[state].container);
            this.switchToState({ state: state });
        },
        gotoState({ state }) {
            if (stateInstances[state]) {
                this.switchToState({ state });
            }
            else {
                this.startNewState({ state });
            }
        },
        switchToState({ state }) {
            if (stateInstances[currentState]) app.ticker.remove(stateInstances[currentState].update);
            currentState = state;
            if (stateInstances[currentState]) app.ticker.add(stateInstances[currentState].update);
            const calculateVisibilityOfStateContainer = (state) => {
                if (stateInstances[state]) {
                    stateInstances[state].container.visible = currentState === state;
                }
            };
            calculateVisibilityOfStateContainer(STATES.MENU);
            calculateVisibilityOfStateContainer(STATES.GAME_CONFIG);
            calculateVisibilityOfStateContainer(STATES.GAME);
            stateInstances[currentState].switchTo();
        },
        getState({ state }) {
            return stateInstances[state];
        },
    };
    stateMachine.startNewState({ state: STATES.MENU });
    app.stage.addChild(createHud().container);
    return stateMachine;
}
