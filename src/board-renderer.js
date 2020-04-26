import { ASSETS, CreateSprite } from './sprites.js';
import { getCurrentSkin } from './layout.js';
import { TYPE } from './player.js';

const HOME_ROW_RECT = {
    [TYPE.WHITE]: {
        top: getCurrentSkin().homeRowRect.white.top,
        bottom: getCurrentSkin().homeRowRect.white.bottom,
    },
    [TYPE.BLACK]: {
        top: getCurrentSkin().homeRowRect.black.top,
        bottom: getCurrentSkin().homeRowRect.black.bottom,
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
    if (index === 1 && player.type === TYPE.WHITE) return getCurrentSkin().spaces.w1;
    if (index === 2 && player.type === TYPE.WHITE) return getCurrentSkin().spaces.w2;
    if (index === 3 && player.type === TYPE.WHITE) return getCurrentSkin().spaces.w3;
    if (index === 4 && player.type === TYPE.WHITE) return getCurrentSkin().spaces.w4;
    if (index === 1 && player.type === TYPE.BLACK) return getCurrentSkin().spaces.b1;
    if (index === 2 && player.type === TYPE.BLACK) return getCurrentSkin().spaces.b2;
    if (index === 3 && player.type === TYPE.BLACK) return getCurrentSkin().spaces.b3;
    if (index === 4 && player.type === TYPE.BLACK) return getCurrentSkin().spaces.b4;
    if (index === 5) return getCurrentSkin().spaces.mid5;
    if (index === 6) return getCurrentSkin().spaces.mid6;
    if (index === 7) return getCurrentSkin().spaces.mid7;
    if (index === 8) return getCurrentSkin().spaces.mid8;
    if (index === 9) return getCurrentSkin().spaces.mid9;
    if (index === 10) return getCurrentSkin().spaces.mid10;
    if (index === 11) return getCurrentSkin().spaces.mid11;
    if (index === 12) return getCurrentSkin().spaces.mid12;
    if (index === 13 && player.type === TYPE.WHITE) return getCurrentSkin().spaces.w13;
    if (index === 14 && player.type === TYPE.WHITE) return getCurrentSkin().spaces.w14;
    if (index === 13 && player.type === TYPE.BLACK) return getCurrentSkin().spaces.b13;
    if (index === 14 && player.type === TYPE.BLACK) return getCurrentSkin().spaces.b14;
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
