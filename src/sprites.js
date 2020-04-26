import { loader, Sprite } from './engine.js';

import bmWhiteSprite from './skins/british-museum/white.png';
import bmBlackSprite from './skins/british-museum/black.png';
import bmBoardSprite from './skins/british-museum/background.png';
import simpleBlackSprite from './skins/simple/black.png';
import simpleWhiteSprite from './skins/simple/white.png';
import simpleBoardSprite from './skins/simple/board.png';
import simpleDiceNull from './skins/simple/dice-0.png';
import simpleDiceOne from './skins/simple/dice-1.png';

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

function getResource(asset) {
    const assetInSkin = loader.resources[`${SKINS[currentSkin]}/${asset}`];
    return assetInSkin ? assetInSkin : loader.resources[`${SKINS[0]}/${asset}`];
}

export function changeSpriteTexture({ sprite, asset }) {
    sprite.texture = getResource(asset).texture;
}

export function CreateSprite({ asset }) {
    return new Sprite(getResource(asset).texture);
}

export function addAssets({ loader }) {
    return loader
        .add(SKINS[0] + '/' + ASSETS.WHITE_PIECE, simpleWhiteSprite)
        .add(SKINS[0] + '/' + ASSETS.BLACK_PIECE, simpleBlackSprite)
        .add(SKINS[0] + '/' + ASSETS.DICE_NULL, simpleDiceNull)
        .add(SKINS[0] + '/' + ASSETS.DICE_ONE, simpleDiceOne)
        .add(SKINS[0] + '/' + ASSETS.BOARD, simpleBoardSprite)

        .add(SKINS[1] + '/' + ASSETS.BLACK_PIECE, bmBlackSprite)
        .add(SKINS[1] + '/' + ASSETS.WHITE_PIECE, bmWhiteSprite)
        .add(SKINS[1] + '/' + ASSETS.BOARD, bmBoardSprite);
}
