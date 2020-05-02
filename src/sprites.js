import { loader, Sprite } from './engine.js';
import { getCurrentSkin, SKINS } from './layout.js';

import bmDice0aSprite from './skins/british-museum/dice0-a.png';
import bmDice0bSprite from './skins/british-museum/dice0-b.png';
import bmDice1aSprite from './skins/british-museum/dice1-a.png';
import bmDice1bSprite from './skins/british-museum/dice1-b.png';
import bmWhiteSprite from './skins/british-museum/white.png';
import bmBlackSprite from './skins/british-museum/black.png';
import bmBoardSprite from './skins/british-museum/background.png';
import bmPlateSprite from './skins/british-museum/plate.png';
import bmNewGameButtonSprite from './skins/british-museum/new-game-button.png';
import bmContinueButtonSprite from './skins/british-museum/continue-button.png';

import simpleBlackSprite from './skins/simple/black.png';
import simpleWhiteSprite from './skins/simple/white.png';
import simpleBoardSprite from './skins/simple/board.png';
import simpleDiceNull from './skins/simple/dice-0.png';
import simpleDiceOne from './skins/simple/dice-1.png';


export const ASSETS = {
    WHITE_PIECE: 'whitePiece',
    BLACK_PIECE: 'blackPiece',
    BOARD: 'board',
    DICE_NULL_A: 'diceNullA',
    DICE_NULL_B: 'diceNullB',
    DICE_ONE_A: 'diceOneA',
    DICE_ONE_B: 'diceOneb',
    PLATE: 'plate',
    NEW_GAME_BUTTON: 'newGameButton',
    CONTINUE_BUTTON: 'continueButton',
};

function getResource(asset) {
    const assetInSkin = loader.resources[`${getCurrentSkin().resourceKeyPrefix}/${asset}`];
    if (assetInSkin) {
        return assetInSkin;
    }
    const firstHitInOtherSkins = SKINS
        .map(skin => loader.resources[`${skin.resourceKeyPrefix}/${asset}`])
        .find(resource => !!resource);
    if (firstHitInOtherSkins) {
        return firstHitInOtherSkins;
    }
    throw new Error(`No skin contains asset ${asset}`);
}

export function getRandomSpriteTexture(pip) {
    let dice_sprites = [];
    if (pip === 0) {
        dice_sprites = [ASSETS.DICE_NULL_A, ASSETS.DICE_NULL_B];
    }
    else {
        dice_sprites = [ASSETS.DICE_ONE_A, ASSETS.DICE_ONE_B];
    }
    return dice_sprites[Math.floor(Math.random() * dice_sprites.length)];
}

export function changeSpriteTexture({ sprite, asset }) {
    sprite.texture = getResource(asset).texture;
}

export function CreateSprite({ asset }) {
    return new Sprite(getResource(asset).texture);
}

export function addAssets({ loader }) {
    return loader
        .add(SKINS[0].resourceKeyPrefix + '/' + ASSETS.WHITE_PIECE, simpleWhiteSprite)
        .add(SKINS[0].resourceKeyPrefix + '/' + ASSETS.BLACK_PIECE, simpleBlackSprite)
        .add(SKINS[0].resourceKeyPrefix + '/' + ASSETS.DICE_NULL_A, simpleDiceNull)
        .add(SKINS[0].resourceKeyPrefix + '/' + ASSETS.DICE_ONE_A, simpleDiceOne)
        .add(SKINS[0].resourceKeyPrefix + '/' + ASSETS.BOARD, simpleBoardSprite)

        .add(SKINS[1].resourceKeyPrefix + '/' + ASSETS.DICE_NULL_A, bmDice0aSprite)
        .add(SKINS[1].resourceKeyPrefix + '/' + ASSETS.DICE_NULL_B, bmDice0bSprite)
        .add(SKINS[1].resourceKeyPrefix + '/' + ASSETS.DICE_ONE_A, bmDice1aSprite)
        .add(SKINS[1].resourceKeyPrefix + '/' + ASSETS.DICE_ONE_B, bmDice1bSprite)
        .add(SKINS[1].resourceKeyPrefix + '/' + ASSETS.BLACK_PIECE, bmBlackSprite)
        .add(SKINS[1].resourceKeyPrefix + '/' + ASSETS.WHITE_PIECE, bmWhiteSprite)
        .add(SKINS[1].resourceKeyPrefix + '/' + ASSETS.BOARD, bmBoardSprite)
        .add(SKINS[1].resourceKeyPrefix + '/' + ASSETS.NEW_GAME_BUTTON, bmNewGameButtonSprite)
        .add(SKINS[1].resourceKeyPrefix + '/' + ASSETS.CONTINUE_BUTTON, bmContinueButtonSprite)
        .add(SKINS[1].resourceKeyPrefix + '/' + ASSETS.PLATE, bmPlateSprite);
}
