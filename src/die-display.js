// visible for testing
export function correctScaleForY({ yPos, scaleFrom = 0.75, scaleTo = 1.0, skin }) {
    const diceArea = skin.diceArea;
    const verticalSpread = diceArea.bottom - 48 - diceArea.top;
    return scaleTo - (verticalSpread - (yPos - diceArea.top)) / verticalSpread * (1 - scaleFrom);
}
