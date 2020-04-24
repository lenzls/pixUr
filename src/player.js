import { loader, Sprite } from './engine.js';
import { ASSETS } from './sprites.js';

function CreatePlayer({ name, pieceTexture }) {
    const pieceSprites = [];
    pieceSprites.push(new Sprite(pieceTexture));
    return {
        name,
        pieceSprites,
    };
}

export function CreateBlackPlayer() {
    return CreatePlayer({ name: 'black', pieceTexture: loader.resources[ASSETS.BLACK_PIECE].texture });
}

export function CreateWhitePlayer() {
    return CreatePlayer({ name: 'white', pieceTexture: loader.resources[ASSETS.WHITE_PIECE].texture });
}
