import { loader, Sprite } from './engine.js';
import { CreatePiece } from './piece.js';
import { ASSETS } from './sprites.js';

export const TYPE = {
    BLACK: 'black',
    WHITE: 'white',
};

function CreatePlayer({ name, pieceTexture, type }) {
    const pieces = [];
    const player = {
        name,
        pieces,
        type,
    };
    pieces.push(CreatePiece({ player, sprite: new Sprite(pieceTexture) }));
    pieces.push(CreatePiece({ player, sprite: new Sprite(pieceTexture) }));
    pieces.push(CreatePiece({ player, sprite: new Sprite(pieceTexture) }));
    pieces.push(CreatePiece({ player, sprite: new Sprite(pieceTexture) }));
    pieces.push(CreatePiece({ player, sprite: new Sprite(pieceTexture) }));
    pieces.push(CreatePiece({ player, sprite: new Sprite(pieceTexture) }));
    pieces.push(CreatePiece({ player, sprite: new Sprite(pieceTexture) }));
    return player;
}

export function CreateBlackPlayer() {
    return CreatePlayer({ 
        name: 'black', 
        pieceTexture: loader.resources[ASSETS.BLACK_PIECE].texture,
        type: TYPE.BLACK,
    });
}

export function CreateWhitePlayer() {
    return CreatePlayer({ 
        name: 'white', 
        pieceTexture: loader.resources[ASSETS.WHITE_PIECE].texture,
        type: TYPE.WHITE,
    });
}
