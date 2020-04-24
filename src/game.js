import { CreateBoard } from './board.js';
import { CreateWhitePlayer, CreateBlackPlayer } from './player.js';


export function CreateGame() {
    return {
        board: CreateBoard(),
        white: CreateWhitePlayer(),
        black: CreateBlackPlayer(),
    };
}
