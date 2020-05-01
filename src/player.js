import { CreatePiece } from './piece.js';
import { ASSETS, CreateSprite } from './sprites.js';

export const TYPE = {
    BLACK: 'black',
    WHITE: 'white',
};

function CreatePlayer({ name, asset, type }) {
    const pieces = [];
    const player = {
        name,
        pieces,
        type,
    };
    pieces.push(CreatePiece({ player, sprite: CreateSprite({ asset }) }));
    pieces.push(CreatePiece({ player, sprite: CreateSprite({ asset }) }));
    pieces.push(CreatePiece({ player, sprite: CreateSprite({ asset }) }));
    pieces.push(CreatePiece({ player, sprite: CreateSprite({ asset }) }));
    pieces.push(CreatePiece({ player, sprite: CreateSprite({ asset }) }));
    pieces.push(CreatePiece({ player, sprite: CreateSprite({ asset }) }));
    pieces.push(CreatePiece({ player, sprite: CreateSprite({ asset }) }));
    return player;
}

export function CreateBlackPlayer() {
    return CreatePlayer({
        name: 'black',
        asset: ASSETS.BLACK_PIECE,
        type: TYPE.BLACK,
    });
}

export function CreateWhitePlayer() {
    return CreatePlayer({
        name: 'white',
        asset: ASSETS.WHITE_PIECE,
        type: TYPE.WHITE,
    });
}
