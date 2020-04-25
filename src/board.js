import { ASSETS } from './sprites.js';
import { Sprite, loader } from './engine.js';
import { addPieceToBoard, removePieceFromBoard } from './board-renderer.js';


export function CreateBoard() {
    const spaces = [];
    for (let i = 0; i < 16; i++) {
        spaces[i] = [];
    }
    return {
        sprite: new Sprite(loader.resources[ASSETS.BOARD].texture),
        spaces,
        clear() {},
        addPiece({ piece, index }) {
            spaces[index].push(piece);
            addPieceToBoard({ piece, index });
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
                removePieceFromBoard({ piece });
            }
        },
    };
}
