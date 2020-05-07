export function CreateHumanActor({ me }) {
    let diceRollCallback = null;
    let moveCallback = null;
    let touchPieceCallback = null;

    function useMoveCallback(args) {
        const toCall = moveCallback;
        moveCallback = null;
        toCall(args);
    }
    function useDiceCallback(args) {
        const toCall = diceRollCallback;
        diceRollCallback = null;
        toCall(args);
    }
    function makePiecesInteractive(action) {
        touchPieceCallback = action;
        me.pieces.forEach(({ sprite }) => {
            sprite.on('pointerdown', touchPieceCallback);
            sprite.interactive = true;
        });
    }
    function removePiecesInteractiveness() {
        me.pieces.forEach(({ sprite }) => {
            sprite.off('pointerdown', touchPieceCallback);
            sprite.interactive = false;
        });
    }

    return {
        askWhenToRollDice({ nowCallback }) {
            diceRollCallback = nowCallback;
        },
        askToThinkOfMove({ doneCallback }) {
            makePiecesInteractive((event) => this.touchPiece({ piece: event.target.piece }));
            moveCallback = doneCallback;
        },
        touchDice() {
            useDiceCallback();
        },
        touchPiece({ piece }) {
            removePiecesInteractiveness();
            useMoveCallback({ piece });
        },
    };
}
