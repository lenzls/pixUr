import blackSprite from './assets/graphics/black.png';
import whiteSprite from './assets/graphics/white.png';
import boardSprite from './assets/graphics/board.png';

export const ASSETS = {
    WHITE_PIECE: 'whitePiece',
    BLACK_PIECE: 'blackPiece',
    BOARD: 'board',
};

export function addAssets({ loader }) {
    return loader
        .add(ASSETS.WHITE_PIECE, whiteSprite)
        .add(ASSETS.BLACK_PIECE, blackSprite)
        .add(ASSETS.BOARD, boardSprite);
}
