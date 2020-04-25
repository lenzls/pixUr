import blackSprite from './assets/graphics/black.png';
import whiteSprite from './assets/graphics/white.png';
import boardSprite from './assets/graphics/board.png';
import diceNull from './assets/graphics/dice-0.png';
import diceOne from './assets/graphics/dice-1.png';

export const ASSETS = {
    WHITE_PIECE: 'whitePiece',
    BLACK_PIECE: 'blackPiece',
    BOARD: 'board',
    DICE_NULL: 'diceNull',
    DICE_ONE: 'diceOne',
};

export function addAssets({ loader }) {
    return loader
        .add(ASSETS.WHITE_PIECE, whiteSprite)
        .add(ASSETS.BLACK_PIECE, blackSprite)
        .add(ASSETS.DICE_NULL, diceNull)
        .add(ASSETS.DICE_ONE, diceOne)
        .add(ASSETS.BOARD, boardSprite);
}
