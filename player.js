
import { loader, Sprite } from './engine.js';
import { ASSETS } from './sprites.js';

export function CreatePlayer({ name, pieceTexture }) {
    const pieceSprites = [];
    pieceSprites.push(new Sprite(pieceTexture));
    return {
        name,
        pieceSprites,
    };
}

export function CreateBlackPlayer() {
    return CreatePlayer({ name: 'Black', pieceTexture: loader.resources[ASSETS.BLACK_PIECE].texture });
}

export function CreateWhitePlayer() {
    return CreatePlayer({ name: 'White', pieceTexture: loader.resources[ASSETS.WHITE_PIECE].texture });
}
