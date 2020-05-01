import { describe, it, expect } from '@jest/globals';

import { isMoveValid } from './game-rules.js';

describe('game-rules', () => {
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
        });
    });
});
