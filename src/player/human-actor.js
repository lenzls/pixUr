export function CreateHumanActor({ me }) {
    let diceRollCallback = null;
    let moveCallback = null;
    let touchPieceCallback = null;
    return {
        askWhenToRollDice({ nowCallback }) {
            diceRollCallback = nowCallback;
        },
        askToThinkOfMove({ doneCallback }) {
            touchPieceCallback = (event) => this.touchPiece({ piece: event.target.piece });
            me.pieces.forEach(({ sprite }) => {
                sprite.on('pointerdown', touchPieceCallback);
                sprite.interactive = true;
            });
            moveCallback = doneCallback;
        },
        touchDice() {
            diceRollCallback();
            diceRollCallback = null;
        },
        touchPiece({ piece }) {
            moveCallback({ piece });
            moveCallback = null;
            me.pieces.forEach(({ sprite }) => {
                sprite.off('pointerdown', touchPieceCallback);
                sprite.interactive = false;
            });
        },
    };
}
