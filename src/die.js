import { ASSETS, CreateSprite, changeSpriteTexture } from './sprites.js';

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
