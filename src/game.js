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
            console.log('attempting to move', piece);
            if (piece.player !== this.currentPlayer) {
                alert("It's not your turn, pal");
                return;
            }
            if (!this.currentPlayerRolled) {
                alert('Roll the dice first, pal');
                return;
            }
            const index = board.getIndex({ piece });
            const aim = index + pips(this.lastRoll);
            
            const conductValidMove = ({ piece, start, aim }) => {
                board.removePiece({ piece, index: start });
                board.addPiece({ piece, index: aim });
                if (onRosette(aim)) {
                    this.anotherTurn();
                }
                else {
                    this.switchPlayer();
                }
            };
            const combat = ({ piece, index }) => {
                const opponentPiece = board.getPieces({ index }).find(pieceInSpace => pieceInSpace.player !== piece.player);
                board.removePiece({ piece: opponentPiece, index });
                board.addPiece({ piece: opponentPiece, index: 0 });
            };
            const noOwnPiecesInSpace = ({ player, index }) => board.getPieces({ index }).every(p => p.player !== player);
            const noPiecesInSpace = ({ index }) => board.getPieces({ index }).length > 0;
            const inSafeZone = (index) => (0 <= index && index <= 4) || (13 <= index && index <= 14);
            const inCombatZone = (index) => (5 <= index && index <= 12);
            const inGoal = (index) => index === 15;
            const behindGoal = (index) => index >= 16;
            const onRosette = (index) => [4, 8, 14].includes(index);

            if (inSafeZone(aim)) {
                if (noOwnPiecesInSpace({ player: this.currentPlayer, index: aim })) {
                    conductValidMove({ piece, start: index, aim });
                }
            }
            else if (inCombatZone(aim)) {
                if (noPiecesInSpace({ index: aim })) {
                    combat({ piece, index: aim });
                }
                conductValidMove({ piece, start: index, aim });
            }
            else if (inGoal(aim)) {
                conductValidMove({ piece, start: index, aim });
            }
            else if (behindGoal(aim)) {
                console.log('Too far, pal.');
            }
        },
        anotherTurn() {
            this.currentPlayerRolled = false;
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
