import { CreateBoard } from './board.js';
import { CreateWhitePlayer, CreateBlackPlayer } from './player.js';
import { CreateDie, totalPips, calcNewDiceSpritePositions } from './die.js';
import { isMoveValid, moveResultsInCombat, validMoveExists } from './game-rules.js';
import { getBoardSprite, addSpriteToSpace, removeSpriteFromSpace } from './board-display.js';
import { STATES } from './state-machine.js';
import { showNotification } from './overlay.js';

export function CreateGame({ stateMachine, container }) {
    const board = CreateBoard({ sprite: getBoardSprite(), addSpriteToSpace, removeSpriteFromSpace });
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
            if (
                totalPips(this.dice) === 0 ||
                !validMoveExists({ board: this.board, player: this.currentPlayer, pips: totalPips(this.dice) })
            ) {
                this.switchPlayer();
            }
        },
        moveAttempt({ piece }) {
            console.log('attempting to move', piece);
            if (piece.player !== this.currentPlayer) {
                showNotification({ title: "It's not your turn, pal", parent: container });
                return;
            }
            if (!this.currentPlayerRolled) {
                showNotification({ title: 'Roll the dice first, pal', parent: container });
                return;
            }
            const startPosition = board.getIndex({ piece });
            const aim = startPosition + totalPips(this.dice);

            const moveEvaluation = isMoveValid({ index: aim, board, player: this.currentPlayer });
            if (moveEvaluation.valid) {
                if (moveResultsInCombat({ board, play: this.currentPlayer, index: aim })) {
                    this.combat({ piece, index: aim });
                }
                this.conductValidMove({ piece, start: startPosition, aim });
            }
            else {
                showNotification({ title: moveEvaluation.reason, parent: container });
            }
        },
        conductValidMove({ piece, start, aim }) {
            const onRosette = (index) => [4, 8, 14].includes(index);
            this.board.removePiece({ piece, index: start });
            this.board.addPiece({ piece, index: aim });
            if (onRosette(aim)) {
                this.anotherTurn();
            }
            else {
                this.switchPlayer();
            }
        },
        combat({ piece, index }) {
            const opponentPiece = board.getPieces({ index }).find(pieceInSpace => pieceInSpace.player !== piece.player);
            this.board.removePiece({ piece: opponentPiece, index });
            this.board.addPiece({ piece: opponentPiece, index: 0 });
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
                showNotification({ title: 'Black has won!', parent: container });
                stateMachine.switchToState({ state: STATES.MENU });
            }
            if (hasPlayerWon(white)) {
                showNotification({ title: 'White has won!', parent: container });
                stateMachine.switchToState({ state: STATES.MENU });
            }
        },
    };
}
