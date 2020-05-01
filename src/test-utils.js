export const CreatePiece = (player) => ({
    player,
});
const CreatePlayer = (name) => ({
    name,
});
export const black = CreatePlayer('black');
export const white = CreatePlayer('white');
