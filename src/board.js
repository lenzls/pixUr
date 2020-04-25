import { TYPE } from './player.js';
import { ASSETS } from './sprites.js';
import { Sprite, loader } from './engine.js';

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
            const getPlayerBaselineYPos = ({ player }) => {
                return player.type === TYPE.WHITE ? 10 : 420;
            };
            const getPlayerYPos = ({ player }) => {
                return player.type === TYPE.WHITE ? 130 : 260;
            };

            spaces.forEach((space, index) => {
                if (index === 0) {
                    space.forEach(piece => {
                        const localIndex = spaces[0].filter(p => p.player === piece.player).indexOf(piece);
                        piece.sprite.position.set(10 + localIndex * 10, getPlayerBaselineYPos({ ...piece }));
                    });
                }
                else if (index <= 4) {
                    space.forEach(piece => {
                        const x = 255 - (index - 1) * 65;
                        piece.sprite.position.set(x, getPlayerYPos({ ...piece })); 
                    });
                }
                else if (index <= 12) {
                    const piece = spaces[index][0];
                    if (piece) { 
                        const x = 65 + (index - 5) * 65;
                        piece.sprite.position.set(x, 190); 
                    }
                }
                else if (index <= 14) {
                    space.forEach(piece => {
                        const x = 650 - (index - 11) * 65;
                        piece.sprite.position.set(x, getPlayerYPos({ ...piece })); 
                    });
                }
                else if (index === 15) {
                    space.forEach(piece => {
                        const localIndex = spaces[15].filter(p => p.player === piece.player).indexOf(piece);
                        piece.sprite.position.set(500 + localIndex * 10, getPlayerBaselineYPos({ ...piece }));
                    });
                }

            });
        },
    };
}
