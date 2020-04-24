import { TYPE } from './player.js';

export function CreateBoard() {
    const spaces = [
        // supplyWhite
        // goalWhite
        // 
        // supplyBlack
        // goalBlack
    ];
    for (let i = 0; i < 24; i++) {
        spaces[i] = [];
    }
    return {
        spaces,
        clear() {},
        setPiece({ piece, index }) {
            spaces[index].push(piece);
        },
        removePiece({ piece, index }) {},
        updatePieceRenderingPositions() {
            spaces[0].forEach((piece, index) => {
                piece.sprite.position.set(
                    10,
                    (piece.player.type === TYPE.WHITE ? 50 : 280) + index * 10
                );
            });
        },
    };
}
