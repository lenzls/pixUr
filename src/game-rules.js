export function isMoveValid({ index, board, player }) {
    if (index < 0) {
        return { valid: false, reason: 'Invalid position. Please file a bug report how you managed to do that :)' };
    }
    if (index > 15) {
        return { valid: false, reason: 'too far' };
    }
    if (hasOwnPieces(board, player, index)) {
        return { valid: false, reason: "You can't take your own pieces" };
    }
    if (inCombatZone(index) && hasOpponentPieces(board, player, index) && inSafeZone(index)) {
        return { valid: false, reason: 'Opponent is in safe space' };
    }
    return { valid: true };
}

export function moveResultsInCombat({ board, player, index }) {
    return inCombatZone(index) && hasOpponentPieces(board, player, index) && !inSafeZone(index);
}

function hasOpponentPieces(board, player, index) {
    return board.getPieces({ index, player }).some(p => p.player !== player);
}

function hasOwnPieces(board, player, index) {
    return board.getPieces({ index, player }).some(p => p.player === player);
}

function inSafeZone(index) {
    return index === 8;
}

export function inCombatZone(index) {
    return (5 <= index && index <= 12);
}
