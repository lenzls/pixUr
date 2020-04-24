import { loader, Sprite } from './engine.js';
import { CreatePiece } from './piece.js';
import { ASSETS } from './sprites.js';

function CreatePlayer({ name, pieceTexture }) {
    const pieces = [];
    const player = {
        name,
        pieces,
    };
    pieces.push(CreatePiece({ player, sprite: new Sprite(pieceTexture) }));
    return player;
}

export function CreateBlackPlayer() {
    return CreatePlayer({ name: 'black', pieceTexture: loader.resources[ASSETS.BLACK_PIECE].texture });
}

export function CreateWhitePlayer() {
    return CreatePlayer({ name: 'white', pieceTexture: loader.resources[ASSETS.WHITE_PIECE].texture });
}
