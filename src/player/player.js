import { CreatePiece } from '../piece.js';
import { ASSETS } from '../sprites.js';

import { CreateAiActor } from './ai-actor.js';
import { CreateHumanActor } from './human-actor.js';

export const COLOUR = {
    BLACK: 'black',
    WHITE: 'white',
};

export const ACTOR_TYPE = {
    AI: 'ai',
    HUMAN: 'human',
};

function CreatePlayer({ name, asset, actorType, colour }) {
    const pieces = [];
    const player = {
        name,
        pieces,
        actorType,
        colour,
        actor: null,
    };
    if (actorType === ACTOR_TYPE.AI) {
        player.actor = CreateAiActor({ me: player });
    }
    if (actorType === ACTOR_TYPE.HUMAN) {
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

export function CreateBlackPlayer({ actorType }) {
    return CreatePlayer({
        name: 'black',
        asset: ASSETS.BLACK_PIECE,
        colour: COLOUR.BLACK,
        actorType,
    });
}

export function CreateWhitePlayer({ actorType }) {
    return CreatePlayer({
        name: 'white',
        asset: ASSETS.WHITE_PIECE,
        colour: COLOUR.WHITE,
        actorType,
    });
}
