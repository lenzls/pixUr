import { ASSETS, CreateSprite } from './sprites.js';
import { getCurrentSkin } from './layout.js';
import { TYPE } from './player.js';

function getRect({ index, player }) {
    if (index === 0 && player.type === TYPE.WHITE) return getCurrentSkin().spaces.wstart;
    if (index === 0 && player.type === TYPE.BLACK) return getCurrentSkin().spaces.bstart;
    if (index === 15 && player.type === TYPE.WHITE) return getCurrentSkin().spaces.wend;
    if (index === 15 && player.type === TYPE.BLACK) return getCurrentSkin().spaces.bend;
    return getCurrentSkin()
        .spaces[`${5 <= index && index <= 12 ? 'mid' : player.type[0]}${index}`];
}

function randomInt(minInclusive, maxExclusive) {
    return Math.floor(minInclusive + Math.random() * (maxExclusive - minInclusive));
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

export function removePieceFromBoard({ piece }) {
    piece.sprite.visible = false;
}

export function addPieceToBoard({ otherPiecesInSpace, piece, index }) {
    setSpriteToPositionWithinRect({ 
        spritesInSpaceNotToOverlapWith: 
            otherPiecesInSpace
                .filter(piece => piece.player === piece.player)
                .map(piece => piece.sprite), 
        sprite: piece.sprite, ...getRect({ player: piece.player, index }) 
    });
    piece.sprite.visible = true;
}

export function createBackgroundSprite() {
    return CreateSprite({ asset: ASSETS.BOARD });
}
