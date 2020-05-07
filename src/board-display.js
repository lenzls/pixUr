import { setSpriteToPositionWithinRect } from './sprite-helper.js';
import { getCurrentSkin } from './layout.js';
import { COLOUR } from './player/player.js';
import { ASSETS, CreateSprite } from './sprites.js';


export function addSpriteToSpace({ otherPiecesInSpace, piece, index }) {
    setSpriteToPositionWithinRect({
        spritesInSpaceNotToOverlapWith:
            otherPiecesInSpace
                .filter(piece => piece.player === piece.player)
                .map(piece => piece.sprite),
        sprite: piece.sprite,
        ...getRectOfSpace({ player: piece.player, index }),
    });
    piece.sprite.visible = true;
}

export function removeSpriteFromSpace({ piece }) {
    piece.sprite.visible = false;
}

function getRectOfSpace({ index, player }) {
    if (index === 0 && player.colour === COLOUR.WHITE) return getCurrentSkin().spaces.wstart;
    if (index === 0 && player.colour === COLOUR.BLACK) return getCurrentSkin().spaces.bstart;
    if (index === 15 && player.colour === COLOUR.WHITE) return getCurrentSkin().spaces.wend;
    if (index === 15 && player.colour === COLOUR.BLACK) return getCurrentSkin().spaces.bend;
    return getCurrentSkin()
        .spaces[`${5 <= index && index <= 12 ? 'mid' : player.colour[0]}${index}`];
}

export function getBoardSprite() {
    return CreateSprite({ asset: ASSETS.BOARD });
}
