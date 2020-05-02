import { CreateSprite } from './sprites.js';

export function CreatePiece({ player, asset }) {
    const sprite = CreateSprite({ asset });
    sprite.buttonMode = true;
    const piece = {
        player,
        sprite,
    };
    sprite.piece = piece;
    return piece;
}
