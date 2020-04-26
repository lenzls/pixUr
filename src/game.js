import { CreateBoard } from './board.js';
import { CreateWhitePlayer, CreateBlackPlayer } from './player.js';

const pips = roll => roll.reduce((acc, value) => acc + value, 0);

export function CreateGame() {
    const board = CreateBoard();
    const white = CreateWhitePlayer();
    const black = CreateBlackPlayer();
    board.clear();
    [...white.pieces, ...black.pieces]
        .forEach(piece => board.addPiece({ piece, index: 0 }));

    const hasPlayerWon = (player) => player.pieces.every(piece => board.getIndex({ piece }) === 15);

    return {
        lastRoll: null,
        currentPlayerRolled: false,
        currentPlayer: white,
        board,
        white,
        black,
        rollDice() {
            const rollDice = () => {
                const zeroOrOne = () => Math.floor(Math.random() * 2);
                return [zeroOrOne(), zeroOrOne(), zeroOrOne(), zeroOrOne()];
            };
            this.lastRoll = rollDice();
            this.currentPlayerRolled = true;
            if (pips(this.lastRoll) === 0) {
                this.switchPlayer();
            }
        },
        moveAttempt({ piece }) {
            const player = piece.player;
            
            if (player !== this.currentPlayer) {
                alert("It's not your turn, pal");
                return;
            }
            if (!this.currentPlayerRolled) {
                alert('Roll the dice first, pal');
                return;
            }
            // is it the player's turn?
            console.log('attempting to move', piece);
            const index = board.getIndex({ piece });
            console.log('current index', index);
            const aim = index + pips(this.lastRoll);
            
            const movePiece = ({ piece, start, aim }) => {
                board.removePiece({ piece, index: start });
                board.addPiece({ piece, index: aim });
                this.switchPlayer();
            };
            const combat = ({ piece, index }) => {
                const opponentPiece = board.getPieces({ index }).find(pieceInSpace => pieceInSpace.player !== piece.player);
                board.removePiece({ piece: opponentPiece, index });
                board.addPiece({ piece: opponentPiece, index: 0 });
            };
            if (aim <= 4 || (aim > 12 && aim <= 14)) {
                if (board.getPieces({ index: aim }).filter(p => p.player === player).length === 0) {
                    movePiece({ piece, start: index, aim });
                }
            }
            else if (aim >= 4 && aim <= 12) {
                if (board.getPieces({ index: aim }).length > 0) {
                    combat({ piece, index: aim });
                }
                movePiece({ piece, start: index, aim });
            }
            else if (aim === 15) {
                movePiece({ piece, start: index, aim });
            }
            else {
                console.log('Too far, pal.');
            }
        },
        switchPlayer() {
            this.currentPlayerRolled = false;
            this.currentPlayer = this.currentPlayer === white ? black : white;
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
