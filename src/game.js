import { CreateBoard } from './board.js';
import { CreateWhitePlayer, CreateBlackPlayer } from './player.js';

export function CreateGame() {
    const board = CreateBoard();
    const white = CreateWhitePlayer();
    const black = CreateBlackPlayer();
    board.clear();
    [...white.pieces, ...black.pieces]
        .forEach(piece => board.addPiece({ piece, index: 0 }));

    const hasPlayerWon = (player) => player.pieces.every(piece => board.getIndex({ piece }) === 15);

    return {
        currentPlayer: white,
        board,
        white,
        black,
        moveAttempt({ piece, pips = 1 }) {
            const player = piece.player;
            
            if (player !== this.currentPlayer) {
                alert("It's not your turn, pal");
                return;
            }
            // is it the player's turn?
            console.log('attempting to move', piece);
            const index = board.getIndex({ piece });
            console.log('current index', index);
            const aim = index + pips;
            
            const movePiece = ({ piece, start, aim }) => {
                board.removePiece({ piece, index: start });
                board.addPiece({ piece, index: aim });
                this.currentPlayer = this.currentPlayer === white ? black : white;
            };
            if (aim <= 4 || (aim > 12 && aim <= 14)) {
                if (board.getPieces({ index: aim }).filter(p => p.player === player).length === 0) {
                    movePiece({ piece, start: index, aim });
                }
            }
            else if (aim >= 4 && aim <= 12) {
                if (board.getPieces({ index: aim }).length === 0) {
                    movePiece({ piece, start: index, aim });
                }
            }
            else if (aim === 15) {
                movePiece({ piece, start: index, aim });
            }
            else {
                console.log('Too far, pal.');
            }
        },
        update() {
            if (hasPlayerWon(black)) {
                console.log('black has won!');
            }
            if (hasPlayerWon(white)) {
                console.log('white has won!');
            }
        },
    };
}
