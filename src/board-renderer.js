import { ASSETS, CreateSprite } from './sprites.js';
import { TYPE } from './player.js';

const HOME_ROW_RECT = {
    [TYPE.WHITE]: {
        top: 14,
        bottom: 80,
    },
    [TYPE.BLACK]: {
        top: 350,
        bottom: 416,
    },
};

const SPACE_SIZE = 64;
const PIECE_SIZE = 32;

function getRectInGrid({ column, row }) {
    // topleft square (index 4) is col:1 row:1
    return {
        left: 48 + (column -1 ) * SPACE_SIZE,
        right: 48 + column * SPACE_SIZE,
        top: 112 + (row - 1) * SPACE_SIZE,
        bottom: 112 + row * SPACE_SIZE,
    };
}

function getGridPosition({ index, player }) {
    if (index <= 0 | index >= 15 ) {
        throw new Error('hmm');
    }
    if (index <= 4 || index >= 13) {
        const row = player.type === TYPE.WHITE ? 1 : 3;
        if (index <= 4) return { column: 4 - index + 1, row, };
        if (index >= 13) return { column: 20 - index + 1, row, };
    }
    return {
        row: 2,
        column: index - 4,
    };
}

function getRect({ index, player }) {
    if (index === 0) return { ...HOME_ROW_RECT[player.type], left: 36, right: 350 };
    if (index === 15) return { ...HOME_ROW_RECT[player.type], left: 430, right: 610 };
    return getRectInGrid(getGridPosition({ index, player }));
}

function randomInt(minInclusive, maxExclusive) {
    return Math.floor(minInclusive + Math.random() * (maxExclusive - minInclusive));
}

function setSpriteToPositionWithinRect({ otherPiecesInSpace, sprite, top, bottom, left, right }) {
    const generatePositionCandidate = () => ({
        x: randomInt(left, right - sprite.width),
        y: randomInt(top, bottom - sprite.height),
    });
    const playersOtherPiecesInSpace = otherPiecesInSpace.filter(piece => piece.player === sprite.piece.player);
    const position = tryUntil({
        generator: generatePositionCandidate,
        condition: (candidate) => 
            playersOtherPiecesInSpace
                .every(piece => !overlap(piece.sprite, { ...candidate, width: PIECE_SIZE, height: PIECE_SIZE })),
        maxTries: 200,
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
    setSpriteToPositionWithinRect({ otherPiecesInSpace, sprite: piece.sprite, ...getRect({ player: piece.player, index }) });
    piece.sprite.visible = true;
}

export function createBackgroundSprite() {
    return CreateSprite({ asset: ASSETS.BOARD });
}
