import { ASSETS, CreateSprite, changeSpriteTexture } from './sprites.js';
import { setSpriteToPositionWithinRect } from './sprite-helper.js';
import { getCurrentSkin } from './layout.js';

export function totalPips(dice) { 
    return dice.reduce((acc, die) => acc + die.currentPips, 0);
}

export function CreateDie() {
    return {
        sprite: CreateSprite({ asset: ASSETS.DICE_NULL }),
        currentPips: -1,
        roll() {
            const zeroOrOne = () => Math.floor(Math.random() * 2);
            this.currentPips = zeroOrOne();
            this.updateSprite();
        },
        updateSprite() {
            changeSpriteTexture({ sprite: this.sprite, asset: this.currentPips === 0 ? ASSETS.DICE_NULL : ASSETS.DICE_ONE });
        }
    };
}

export function calcNewDiceSpritePositions({ dice }) {
    dice.forEach(die => {
        die.sprite.position.set(-1000, -1000);
    });
    dice.forEach(die => {
        setSpriteToPositionWithinRect({
            spritesInSpaceNotToOverlapWith: dice.map(die => die.sprite),
            sprite: die.sprite,
            ...getCurrentSkin().diceArea,
            maxTries: 1000
        });
    });
}
