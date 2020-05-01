import { describe, it, expect } from '@jest/globals';

import { isMoveValid } from './game-rules.js';

describe('game-rules', () => {
    describe('isMoveValid', () => {
        describe('invalid', () => {
            const CreatePiece = (player) => ({
                player
            });
            const CreatePlayer = (name) => ({
                name
            });
            const black = CreatePlayer('black');
            const white = CreatePlayer('white');

            it('if move behind goal', () => {
                expect(isMoveValid({ index: 16 }))
                    .toEqual(expect.objectContaining({ valid: false }));
            });
            
            it('if out of playfield', () => {
                expect(isMoveValid({ index: 100 }))
                    .toEqual(expect.objectContaining({ valid: false }));
                expect(isMoveValid({ index: -100 }))
                    .toEqual(expect.objectContaining({ valid: false }));
            });

            it('if space already occupied by own piece', () => {
                const board = { getPieces: () => [CreatePiece(black)] };
                expect(isMoveValid({ index: 2, board, player: black }))
                    .toEqual(expect.objectContaining({ valid: false }));
                expect(isMoveValid({ index: 6, board, player: black }))
                    .toEqual(expect.objectContaining({ valid: false }));
                expect(isMoveValid({ index: 13, board, player: black }))
                    .toEqual(expect.objectContaining({ valid: false }));
            });
        });
    });
});
