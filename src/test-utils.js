export const CreatePiece = (player) => ({
    player,
});
const CreatePlayer = (name) => ({
    name,
});
export const createBlack = () => CreatePlayer('black');
export const createWhite = () => CreatePlayer('white');
