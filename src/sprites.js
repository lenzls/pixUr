import { loader, Sprite } from './engine.js';

import bmBlackSprite from './assets/graphics/british-museum/black.png';
import simpleBlackSprite from './assets/graphics/simple/black.png';
import simpleWhiteSprite from './assets/graphics/simple/white.png';
import simpleBoardSprite from './assets/graphics/simple/board.png';
import simpleDiceNull from './assets/graphics/simple/dice-0.png';
import simpleDiceOne from './assets/graphics/simple/dice-1.png';

// TODO: initialize from filesystem
const SKINS = [
    'simple',
    'british-museum',
];

const currentSkin = 0;

export const ASSETS = {
    WHITE_PIECE: 'whitePiece',
    BLACK_PIECE: 'blackPiece',
    BOARD: 'board',
    DICE_NULL: 'diceNull',
    DICE_ONE: 'diceOne',
};

export function CreateSprite({ asset }) {
    const assetInSkin = loader.resources[`${SKINS[currentSkin]}/${asset}`];
    const resource = assetInSkin ? assetInSkin : loader.resources[`${SKINS[0]}/${asset}`];
    return new Sprite(resource.texture);
}

export function addAssets({ loader }) {
    return loader
        .add(SKINS[0] + '/' + ASSETS.WHITE_PIECE, simpleWhiteSprite)
        .add(SKINS[0] + '/' + ASSETS.BLACK_PIECE, simpleBlackSprite)
        .add(SKINS[0] + '/' + ASSETS.DICE_NULL, simpleDiceNull)
        .add(SKINS[0] + '/' + ASSETS.DICE_ONE, simpleDiceOne)
        .add(SKINS[0] + '/' + ASSETS.BOARD, simpleBoardSprite)

        .add(SKINS[1] + '/' + ASSETS.BLACK_PIECE, bmBlackSprite);
}
