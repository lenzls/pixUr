import { CreateBoard } from './board.js';
import { CreateWhitePlayer, CreateBlackPlayer } from './player.js';


export function CreateGame() {
    const board = CreateBoard();
    const white = CreateWhitePlayer();
    const black = CreateBlackPlayer();
    board.clear();
    [...white.pieces, ...black.pieces]
        .forEach(piece => board.addPiece({ piece, index: 0 }));

    return {
        board,
        white,
        black,
        moveAttempt({ piece, pips = 1 }) {
            const player = piece.player;
            // is it the player's turn?
            console.log('attempting to move', piece);
            const index = board.getIndex({ piece });
            console.log('current index', index);
            const aim = index + pips;
            
            const movePiece = ({ piece, start, aim }) => {
                console.log('move piece ', piece, start, aim)
                board.removePiece({ piece, index: start });
                board.addPiece({ piece, index: aim });
                console.log(`new position is ${aim}`);
            };
            if (aim < 4 || aim > 12 && aim < 15) {
                if (board.getPieces({ index: aim }).filter(p => p.player === player).length === 0) {
                    movePiece({ piece, start: index, aim });
                }
            }
            else if (aim >= 4 && aim <= 12) {
                if (board.getPieces({ index: aim }).length === 0) {
                    movePiece({ piece, start: index, aim });
                }
            }
            else if (aim === 15 || aim === 16) {
                movePiece({ piece, start: index, aim });
            }
            else {
                console.log('reject move attempt');
            }
        },
        update() { 
            board.updatePieceRenderingPositions();
        },
    };
}
