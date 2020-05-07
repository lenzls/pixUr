import { isMoveValid } from '../game-rules.js';

export function CreateAiActor({ me }) {
    return {
        askWhenToRollDice({ nowCallback }) {
            console.log('AI was asked to roll the dice');
            setTimeout(() => nowCallback(), 1000);
        },
        askToThinkOfMove({ board, pips, doneCallback }) {
            const pieceToMove = determinePieceToMove({ board, me, pips });
            console.log(`AI wants to move ${pieceToMove}`);
            doneCallback({ pieceToMove });
        },
    };
}

function determinePieceToMove({ board, me, pips }) {
    return me.pieces.find(piece => isMoveValid({
        index: board.getIndex({ piece }) + pips,
        board,
        player: me,
    }).valid);
}
