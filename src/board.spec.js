import { describe, it, expect } from '@jest/globals';
import { black, white, CreatePiece } from './test-utils.js';

import { CreateBoard } from './board.js';

describe('board', () => {
    describe('getPieces', () => {
        const mockBoardSpriteBindings = { sprite: null, addSpriteToSpace: () => {}, removeSpriteFromSpace: () => {} };

        it('returns only own pieces in home zone', () => {
            const underTest = CreateBoard(mockBoardSpriteBindings);
            const ownPiece = CreatePiece(black);
            underTest.addPiece({ index: 2, piece: ownPiece });
            underTest.addPiece({ index: 2, piece: CreatePiece(white) });
            expect(underTest.getPieces({ index: 2, player: black }))
                .toEqual([ ownPiece ]);
        });

        it('return own pieces in combat zone', () => {
            const underTest = CreateBoard(mockBoardSpriteBindings);
            const ownPiece = CreatePiece(black);

            underTest.addPiece({ index: 7, piece: ownPiece });
            expect(underTest.getPieces({ index: 7, player: black })).toContain(ownPiece);
        });

        it('return opponents pieces in combat zone', () => {
            const underTest = CreateBoard(mockBoardSpriteBindings);
            const otherPiece = CreatePiece(white);

            underTest.addPiece({ index: 7, piece: otherPiece });
            expect(underTest.getPieces({ index: 7, player: black }))
                .toContain(otherPiece);
        });

        it('return only own pieces in goal', () => {
            const underTest = CreateBoard(mockBoardSpriteBindings);
            const ownPiece = CreatePiece(black);

            underTest.addPiece({ index: 15, piece: ownPiece });
            underTest.addPiece({ index: 15, piece: CreatePiece(white) });
            expect(underTest.getPieces({ index: 15, player: black }))
                .toContain(ownPiece);
        });

        it('return multiple pieces in goal', () => {
            const underTest = CreateBoard(mockBoardSpriteBindings);
            const ownPiece1 = CreatePiece(black);
            const ownPiece2 = CreatePiece(black);

            underTest.addPiece({ index: 15, piece: ownPiece1 });
            underTest.addPiece({ index: 15, piece: ownPiece2 });
            const actual = underTest.getPieces({ index: 15, player: black });
            expect(actual).toContain(ownPiece1);
            expect(actual).toContain(ownPiece2);
        });
    });
});
