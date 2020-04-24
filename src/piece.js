export function CreatePiece({ player, sprite }) {
    sprite.player = player;
    return {
        player,
        sprite
    };
}
