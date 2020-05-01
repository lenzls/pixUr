import { inCombatZone } from './game-rules.js';

export function CreateBoard(spriteBindings) {
    const spaces = [];
    for (let i = 0; i < 16; i++) {
        spaces[i] = [];
    }
    return {
        sprite: spriteBindings.sprite,
        spaces,
        clear() {},
        addPiece({ piece, index }) {
            spaces[index].push(piece);
            spriteBindings.addSpriteToSpace({ otherPiecesInSpace: spaces[index], piece, index });
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
                spriteBindings.removeSpriteFromSpace({ piece });
            }
        },
    };
}
