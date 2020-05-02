import { describe, it, expect } from '@jest/globals';

import { correctScaleForY } from './die-display.js';

describe('correctScaleForY', () => {
    it('from 0.5 to 1.0', () => {
        const config = {
            scaleFrom: 0.5,
            scaleTo: 1,
            skin: { diceArea: { top: 60, bottom: 370 } },
        };
        expect(correctScaleForY({ yPos: 60, ...config })).toBe(0.5);
        expect(correctScaleForY({ yPos: 191, ...config })).toBe(0.75);
        expect(correctScaleForY({ yPos: 322, ...config })).toBe(1);
    });

    it('from 0.75 to 1.0', () => {
        const config = {
            scaleFrom: 0.75,
            scaleTo: 1,
            skin: { diceArea: { top: 60, bottom: 370 } },
        };

        expect(correctScaleForY({ yPos: 60, ...config })).toBe(0.75);
        expect(correctScaleForY({ yPos: 191, ...config })).toBe(0.875);
        expect(correctScaleForY({ yPos: 322, ...config })).toBe(1);
    });

    it('different dice areas', () => {
        const config = {
            scaleFrom: 0,
            scaleTo: 1,
            skin: { diceArea: { top: 200, bottom: 648 } },
        };

        expect(correctScaleForY({ yPos: 200, ...config })).toBe(0);
        expect(correctScaleForY({ yPos: 300, ...config })).toBe(0.25);
        expect(correctScaleForY({ yPos: 400, ...config })).toBe(0.5);
        expect(correctScaleForY({ yPos: 500, ...config })).toBe(0.75);
        expect(correctScaleForY({ yPos: 600, ...config })).toBe(1);
    });
});
