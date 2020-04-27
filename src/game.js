import { CreateBoard } from './board.js';
import { CreateWhitePlayer, CreateBlackPlayer } from './player.js';
import { CreateDie, totalPips, calcNewDiceSpritePositions } from './die.js';

export function CreateGame() {
    const board = CreateBoard();
    const white = CreateWhitePlayer();
    const black = CreateBlackPlayer();
    board.clear();
    [...white.pieces, ...black.pieces]
        .forEach(piece => board.addPiece({ piece, index: 0 }));

    const hasPlayerWon = (player) => player.pieces.every(piece => board.getIndex({ piece }) === 15);

    return {
        dice: [CreateDie(), CreateDie(), CreateDie(), CreateDie()],
        currentPlayerRolled: false,
        currentPlayer: white,
        board,
        white,
        black,
        rollDice() {
            this.dice.forEach(die => die.roll());
            calcNewDiceSpritePositions({ dice: this.dice });
            this.currentPlayerRolled = true;
            if (totalPips(this.dice) === 0) {
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
            const aim = index + totalPips(this.dice);

            const aimIsBehindGoal = aim >= 16;

            if (aimIsBehindGoal) {
                alert('Too far.');
                return;
            }
            
            const onRosette = (index) => [4, 8, 14].includes(index);
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
            const ownPiecesInAimSpace = board.getPieces({ index: aim }).some(p => p.player === this.currentPlayer);
            const piecesInAimSpace = board.getPieces({ index: aim }).length > 0;
            const aimInSafeZone = (0 <= aim && aim <= 4) || (13 <= aim && aim <= 14);
            const aimInCombatZone = (5 <= aim && aim <= 12);
            const aimInGoal = aim === 15;
            const aimIsSafeSpace = [8].includes(aim);

            if (ownPiecesInAimSpace && !aimInGoal) {
                alert('Here is already one of yours…');
                return;
            }
            if (
                aimInGoal ||
                !piecesInAimSpace ||
                (aimInSafeZone && !ownPiecesInAimSpace)
            ) {
                return conductValidMove({ piece, start: index, aim });
            }
            if (aimInCombatZone && piecesInAimSpace && !aimIsSafeSpace) {
                combat({ piece, index: aim });
                conductValidMove({ piece, start: index, aim });
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
