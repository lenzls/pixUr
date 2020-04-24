export function CreateBoard() {
    const spaces = [
        // supplyWhite
        // goalWhite
        // 
        // supplyBlack
        // goalBlack
    ];
    return {
        spaces,
        clear() {},
        setPiece({ piece, index }) {},
        removePiece({ piece, index }) {},
    };
}
