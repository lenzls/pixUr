export function CreateHumanActor() {
    let diceRollCallback = null;
    let moveCallback = null;
    return {
        askWhenToRollDice({ nowCallback }) {
            diceRollCallback = nowCallback;
        },
        askToThinkOfMove({ doneCallback }) {
            moveCallback = doneCallback;
        },
        touchDice() {
            diceRollCallback();
            diceRollCallback = null;
        },
        touchPiece({ piece }) {
            moveCallback({ piece });
            moveCallback = null;
        },
    };
}
