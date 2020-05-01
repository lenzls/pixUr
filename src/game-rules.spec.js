import { describe, it, expect } from '@jest/globals';

import { isMoveValid } from './game-rules.js';

describe('game-rules', () => {
    const CreatePiece = (player) => ({
        player
    });
    const CreatePlayer = (name) => ({
        name
    });
    const black = CreatePlayer('black');
    const white = CreatePlayer('white');

    describe('isMoveValid', () => {
        describe('invalid', () => {
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

            it('if occupied by opponent piece but is a safe spot', () => {
                const board = { getPieces: () => [CreatePiece(white)] };
                expect(isMoveValid({ index: 8, board, player: black }))
                    .toEqual(expect.objectContaining({ valid: false }));
            });
        });

        describe('valid', () => {
            it('land on empty space', () => {
                const board = { getPieces: () => [] };
                expect(isMoveValid({ index: 8, board, player: black }))
                    .toEqual(expect.objectContaining({ valid: true }));
            });

            it('land in already occupied goal', () => {
                const board = { getPieces: () => [black, black] };
                expect(isMoveValid({ index: 15, board, player: black }))
                    .toEqual(expect.objectContaining({ valid: true }));
            });

            it('land in combat space', () => {
                const board = { getPieces: () => [white] };
                expect(isMoveValid({ index: 6, board, player: black }))
                    .toEqual(expect.objectContaining({ valid: true }));
            });
        });
    });
});
