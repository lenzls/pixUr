import { ASSETS, CreateSprite } from './sprites.js';
import { setSpriteToPositionWithinRect } from './sprite-helper.js';
import { getCurrentSkin } from './layout.js';
import { TYPE } from './player.js';
import { inCombatZone } from './game-rules.js';

export function CreateBoard() {
    const spaces = [];
    for (let i = 0; i < 16; i++) {
        spaces[i] = [];
    }
    return {
        sprite: CreateSprite({ asset: ASSETS.BOARD }),
        spaces,
        clear() {},
        addPiece({ piece, index }) {
            spaces[index].push(piece);
            addSpriteToSpace({ otherPiecesInSpace: spaces[index], piece, index });
        },
        getPieces({ index, player }) {
            if (inCombatZone(index)) {
                return spaces[index];
            }
            return spaces[index].filter(piece => piece.player === player);
        },
        getIndex({ piece }) {
            return spaces.findIndex(space => space.includes(piece));
        },
        removePiece({ piece, index }) {
            const space = spaces[index];
            const indexWithinSpace = space.indexOf(piece);
            if (indexWithinSpace !== -1) {
                space.splice(indexWithinSpace, 1);
                removeSpriteFromSpace({ piece });
            }
        },
    };
}

function addSpriteToSpace({ otherPiecesInSpace, piece, index }) {
    setSpriteToPositionWithinRect({ 
        spritesInSpaceNotToOverlapWith: 
            otherPiecesInSpace
                .filter(piece => piece.player === piece.player)
                .map(piece => piece.sprite), 
        sprite: piece.sprite, 
        ...getRectOfSpace({ player: piece.player, index }) 
    });
    piece.sprite.visible = true;
}

export function removeSpriteFromSpace({ piece }) {
    piece.sprite.visible = false;
}

function getRectOfSpace({ index, player }) {
    if (index === 0 && player.type === TYPE.WHITE) return getCurrentSkin().spaces.wstart;
    if (index === 0 && player.type === TYPE.BLACK) return getCurrentSkin().spaces.bstart;
    if (index === 15 && player.type === TYPE.WHITE) return getCurrentSkin().spaces.wend;
    if (index === 15 && player.type === TYPE.BLACK) return getCurrentSkin().spaces.bend;
    return getCurrentSkin()
        .spaces[`${5 <= index && index <= 12 ? 'mid' : player.type[0]}${index}`];
}
