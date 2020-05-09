import { CreateBoard } from './board.js';
import { CreateWhitePlayer, CreateBlackPlayer } from './player/player.js';
import { CreateDie, totalPips, calcNewDiceSpritePositions } from './die.js';
import { isMoveValid, moveResultsInCombat, validMoveExists } from './game-rules.js';
import { getBoardSprite, addSpriteToSpace, removeSpriteFromSpace } from './board-display.js';
import { showNotification } from './overlay.js';

export function CreateGame({ container }) {
    const board = CreateBoard({ sprite: getBoardSprite(), addSpriteToSpace, removeSpriteFromSpace });
    const white = CreateWhitePlayer();
    const black = CreateBlackPlayer();
    board.clear();
    [...white.pieces, ...black.pieces]
        .forEach(piece => board.addPiece({ piece, index: 0 }));

    const hasPlayerWon = (player) => player.pieces.every(piece => board.getIndex({ piece }) === 15);

    let gameAborted = false;
    return {
        gameRunning: false,
        dice: [CreateDie(), CreateDie(), CreateDie(), CreateDie()],
        currentPlayerRolled: false,
        currentPlayer: white,
        board,
        white,
        black,
        conductValidMove({ piece, start, aim }) {
            const onRosette = (index) => [4, 8, 14].includes(index);
            this.board.removePiece({ piece, index: start });
            this.board.addPiece({ piece, index: aim });
            if (onRosette(aim)) {
                this.rollAgain();
            }
            else {
                this.endTurn();
            }
        },
        combat({ piece, index }) {
            const opponentPiece = board.getPieces({ index }).find(pieceInSpace => pieceInSpace.player !== piece.player);
            this.board.removePiece({ piece: opponentPiece, index });
            this.board.addPiece({ piece: opponentPiece, index: 0 });
        },
        startGame() {
            this.gameRunning = true;
            this.startTurn();
        },
        endGame() {
            this.gameRunning = false;
        },
        abortRunningGame() {
            gameAborted = true;
        },
        endTurn() {
            if (gameAborted) { this.endGame(); return; }
            if (hasPlayerWon(black)) {
                showNotification({ title: 'Black has won!', parent: container });
                this.endGame();
                return;
            }
            else if (hasPlayerWon(white)) {
                showNotification({ title: 'White has won!', parent: container });
                this.endGame();
                return;
            }

            this.currentPlayer = this.currentPlayer === white ? black : white;
            this.currentPlayerRolled = false;

            this.startTurn();
        },
        rollAgain() {
            this.currentPlayerRolled = false;
            this.startTurn();
        },
        startTurn() {
            if (gameAborted) { this.endGame(); return; }
            this.currentPlayer.actor.askWhenToRollDice({ nowCallback: rollDiceAndAskForNextMove });
            const that = this;
            function rollDiceAndAskForNextMove() {
                if (gameAborted) { that.endGame(); return; }
                that.dice.forEach(die => die.roll());
                calcNewDiceSpritePositions({ dice: that.dice });
                that.currentPlayerRolled = true;
                const pips = totalPips(that.dice);
                if (
                    pips === 0 ||
                    !validMoveExists({ board: that.board, player: that.currentPlayer, pips: totalPips(that.dice) })
                ) {
                    that.endTurn();
                }
                else {
                    that.currentPlayer.actor.askToThinkOfMove({
                        board: that.board,
                        pips,
                        doneCallback: moveAttempt,
                    });
                }
            }

            function moveAttempt({ piece }) {
                if (gameAborted) { that.endGame(); return; }
                if (piece.player !== that.currentPlayer) {
                    showNotification({ title: "It's not your turn, pal", parent: container });
                    return;
                }
                if (!that.currentPlayerRolled) {
                    showNotification({ title: 'Roll the dice first, pal', parent: container });
                    return;
                }
                const startPosition = board.getIndex({ piece });
                const pips = totalPips(that.dice);
                const aim = startPosition + pips;

                const moveEvaluation = isMoveValid({ index: aim, board, player: that.currentPlayer });
                if (moveEvaluation.valid) {
                    if (moveResultsInCombat({ board, play: that.currentPlayer, index: aim })) {
                        that.combat({ piece, index: aim });
                    }
                    that.conductValidMove({ piece, start: startPosition, aim });
                }
                else {
                    showNotification({ title: moveEvaluation.reason, parent: container });

                    that.currentPlayer.actor.askToThinkOfMove({
                        board: that.board,
                        pips,
                        doneCallback: moveAttempt,
                    });
                }
            }
        },
    };
}
