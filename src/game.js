import { CreateBoard } from './board.js';
import { CreateWhitePlayer, CreateBlackPlayer } from './player.js';


export function CreateGame() {
    const board = CreateBoard();
    const white = CreateWhitePlayer();
    const black = CreateBlackPlayer();
    board.clear();
    [...white.pieces, ...black.pieces]
        .forEach(piece => board.setPiece({ piece, index: 0 }));

    return {
        board,
        white,
        black,
    };
}
