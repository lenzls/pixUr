import { describe, it, expect } from '@jest/globals';
import { black, white, CreatePiece } from './test-utils.js';

import { CreateBoard } from './board.js';

describe('board', () => {
    describe('getPieces', () => {
        it('returns only own pieces in home zone', () => {
            const underTest = CreateBoard({ sprite: null, addSpriteToSpace: () => {}, removeSpriteFromSpace: () => {}});
            const ownPiece = CreatePiece(black);
            underTest.addPiece({ index: 2, piece: ownPiece });
            underTest.addPiece({ index: 2, piece: CreatePiece(white) });
            expect(underTest.getPieces({ index: 2, player: black }))
                .toEqual([ ownPiece ]);
        });
    });
});
