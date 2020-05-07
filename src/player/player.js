import { CreatePiece } from '../piece.js';
import { ASSETS } from '../sprites.js';

import { CreateAiActor } from './ai-actor.js';
import { CreateHumanActor } from './human-actor.js';

export const COLOUR = {
    BLACK: 'black',
    WHITE: 'white',
};

export const TYPE = {
    AI: 'ai',
    HUMAN: 'human',
};

function CreatePlayer({ name, asset, type, colour }) {
    const pieces = [];
    const player = {
        name,
        pieces,
        type,
        colour,
        actor: null,
    };
    if (type === TYPE.AI) {
        player.actor = CreateAiActor({ me: player });
    }
    if (type === TYPE.HUMAN) {
        player.actor = CreateHumanActor({ me: player });
    }
    pieces.push(CreatePiece({ player, asset }));
    pieces.push(CreatePiece({ player, asset }));
    pieces.push(CreatePiece({ player, asset }));
    pieces.push(CreatePiece({ player, asset }));
    pieces.push(CreatePiece({ player, asset }));
    pieces.push(CreatePiece({ player, asset }));
    pieces.push(CreatePiece({ player, asset }));
    return player;
}

export function CreateBlackPlayer() {
    return CreatePlayer({
        name: 'black',
        asset: ASSETS.BLACK_PIECE,
        colour: COLOUR.BLACK,
        type: TYPE.HUMAN,
    });
}

export function CreateWhitePlayer() {
    return CreatePlayer({
        name: 'white',
        asset: ASSETS.WHITE_PIECE,
        colour: COLOUR.WHITE,
        type: TYPE.AI,
    });
}
