import { TYPE } from './player.js';
import { ASSETS } from './sprites.js';
import { Sprite, loader } from './engine.js';

const WHITE_ROW_Y = {
    top: 112,
    bottom: 176,
};
const COMBAT_ROW_Y = {
    top: 176,
    bottom: 240,
};
const BLACK_ROW_Y = {
    top: 240,
    bottom: 304,
};

const SAFE_ROW_POSITION = {
    [TYPE.WHITE]: WHITE_ROW_Y,
    [TYPE.BLACK]: BLACK_ROW_Y,
};
const HOME_ROW_POSITION = {
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
    if (index === 0) return { ...HOME_ROW_POSITION[player.type], left: 36, right: 270 };
    if (index === 15) return { ...HOME_ROW_POSITION[player.type], left: 430, right: 610 };
    return getRectInGrid(getGridPosition({ index, player }));
}

function randomInt(minInclusive, maxExclusive) {
    return Math.floor(minInclusive + Math.random() * (maxExclusive - minInclusive));
}

function setSpriteToPositionWithinRect({ sprite, top, bottom, left, right }) {
    const x = randomInt(left, right - SPACE_SIZE);
    const y = randomInt(top, bottom - SPACE_SIZE);
    sprite.position.set(x, y);
}

export function CreateBoard() {
    const spaces = [];
    for (let i = 0; i < 16; i++) {
        spaces[i] = [];
    }
    return {
        sprite: new Sprite(loader.resources[ASSETS.BOARD].texture),
        spaces,
        clear() {},
        addPiece({ piece, index }) {
            spaces[index].push(piece);
        },
        getPieces({ index }) {
            return spaces[index];
        },
        getIndex({ piece }) {
            return spaces.findIndex(space => space.includes(piece));
        },
        removePiece({ piece, index }) {
            const space = spaces[index];
            const indexWithinSpace = space.indexOf(piece);
            if (indexWithinSpace !== -1) {
                space.splice(indexWithinSpace, 1);
            }
        },
        updatePieceRenderingPositions() {
            spaces.forEach((space, index) => {
                space.forEach(piece => {
                    setSpriteToPositionWithinRect({ sprite: piece.sprite, ...getRect({ player: piece.player, index }) });
                });
            });
        },
    };
}
