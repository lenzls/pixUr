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
            const calcYPos = ({ player, index }) => {
                if (index > 4 && index < 13) return 120;
                return player.type === TYPE.WHITE ? 50 : 340;
            };

            spaces.forEach((space, index) => {
                if (index === 0) {
                    space.forEach(piece => {
                        const localIndex = spaces[0].filter(p => p.player === piece.player).indexOf(piece);
                        piece.sprite.position.set(10, calcYPos({ ...piece, index }) + localIndex * 10);
                    });
                }
                else if (index <= 4) {
                    const piece = spaces[index][0];
                    if (piece) { 
                        const x = 10 + (4 - index) * 36;
                        piece.sprite.position.set(x, calcYPos({ ...piece, index })); 
                    }
                }
                else if (index <= 12) {
                    const piece = spaces[index][0];
                    if (piece) { 
                        const x = 10 + (index - 5) * 36;
                        piece.sprite.position.set(x, calcYPos({ ...piece, index })); 
                    }
                }
                else if (index <= 14) {
                    const piece = spaces[index][0];
                    if (piece) { 
                        const x = 500 + (14 - index) * 36;
                        piece.sprite.position.set(x, calcYPos({ ...piece, index })); 
                    }
                }
                else if (index === 15) {
                    space.forEach(piece => {
                        const localIndex = spaces[15].filter(p => p.player === piece.player).indexOf(piece);
                        piece.sprite.position.set(600, calcYPos({ ...piece, index }) + localIndex * 10);
                    });
                }

            });
        },
    };
}
