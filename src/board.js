import { TYPE } from './player.js';

export function CreateBoard() {
    const spaces = [
        // supplyWhite
        // goalWhite
        // 
        // supplyBlack
        // goalBlack
    ];
    for (let i = 0; i < 16; i++) {
        spaces[i] = [];
    }
    return {
        spaces,
        clear() {},
        addPiece({ piece, index }) {
            spaces[index].push(piece);
        },
        getPieces({ index }) {
            return spaces[index];
        },
        getIndex({ piece }) {
            return spaces.findIndex(space => space.includes(piece));
        },
        removePiece({ piece, index }) {
            const space = spaces[index];
            const indexWithinSpace = space.indexOf(piece);
            if (indexWithinSpace !== -1) {
                space.splice(indexWithinSpace, 1);
            }
        },
        updatePieceRenderingPositions() {
            const calcYPos = (piece) => piece.player.type === TYPE.WHITE ? 50 : 340;
            spaces.forEach((space, spaceIndex) => {
                space.forEach(piece => {
                    const localIndex = space.filter(p => p.player === piece.player).indexOf(piece);
                    piece.sprite.position.set(10 + 40 * spaceIndex, calcYPos(piece) + localIndex * 10);
                });
            });
        },
    };
}
