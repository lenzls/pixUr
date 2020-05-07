import { isMoveValid } from '../game-rules.js';

const ROLL_HESITATION_IN_MS = 500;
const MOVE_HESITATION_IN_MS = 700;

export function CreateAiActor({ me }) {
    return {
        askWhenToRollDice({ nowCallback }) {
            console.log('AI was asked to roll the dice');
            setTimeout(() => nowCallback(), ROLL_HESITATION_IN_MS);
        },
        askToThinkOfMove({ board, pips, doneCallback }) {
            const think = () => {
                const pieceToMove = determinePieceToMove({ board, me, pips });
                doneCallback({ piece: pieceToMove });
            };
            setTimeout(() => think(), MOVE_HESITATION_IN_MS);
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
