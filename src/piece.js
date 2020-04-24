export function CreatePiece({ player, sprite }) {
    const piece = {
        player,
        sprite
    };
    sprite.piece = piece;
    return piece;
}
