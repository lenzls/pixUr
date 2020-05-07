import { isMoveValid } from '../game-rules.js';

export function CreateAiActor({ me }) {
    return {
        askWhenToRollDice({ nowCallback }) {
            console.log('AI was asked to roll the dice');
            setTimeout(() => nowCallback(), 2000);
        },
        askToThinkOfMove({ board, pips, doneCallback }) {
            const think = () => {
                const pieceToMove = determinePieceToMove({ board, me, pips });
                const start = board.getIndex({ piece: pieceToMove });
                console.log(`AI wants to move from ${start} to ${start + pips}`);
                doneCallback({ piece: pieceToMove });
            }
            setTimeout(() => think(), 2000);
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
