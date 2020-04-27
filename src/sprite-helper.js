
function randomInt(minInclusive, maxExclusive) {
    return Math.floor(minInclusive + Math.random() * (maxExclusive - minInclusive));
}

function tryUntil({ generator, condition, maxTries }) {
    let candidate;
    let counter = 0;
    do {
        candidate = generator();
        counter++;
    }
    while (
        counter < maxTries &&
        !condition(candidate)
    );
    return candidate;
}

function overlap(sprite1, sprite2) {
    if (
        (sprite1.x + sprite1.width < sprite2.x) ||
        (sprite1.x > sprite2.x + sprite2.width) ||
        (sprite1.y + sprite2.height < sprite2.y) ||
        (sprite1.y > sprite2.y + sprite2.height)
    ) return false;
    return true;
}

export function setSpriteToPositionWithinRect({ spritesInSpaceNotToOverlapWith, sprite, top, bottom, left, right, maxTries = 200 }) {
    const generatePositionCandidate = () => ({
        x: randomInt(left, right - sprite.width),
        y: randomInt(top, bottom - sprite.height),
    });
    const position = tryUntil({
        generator: generatePositionCandidate,
        condition: (candidate) => 
            spritesInSpaceNotToOverlapWith
                .every(other => !overlap(other, { ...candidate, width: sprite.width, height: sprite.height })),
        maxTries,
    });
    sprite.position.set(position.x, position.y);
}
