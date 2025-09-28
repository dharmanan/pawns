import type { Position } from './types';

export type BoardLayout = (0 | 1)[][];

export interface Level {
  layout: BoardLayout;
  startHole: Position;
}

const LEVEL_1_LAYOUT: BoardLayout = [
    [0, 0, 1, 1, 1, 0, 0],
    [0, 0, 1, 1, 1, 0, 0],
    [1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1],
    [0, 0, 1, 1, 1, 0, 0],
    [0, 0, 1, 1, 1, 0, 0]
];

// A more forgiving diamond-shaped layout for level 2
const LEVEL_2_LAYOUT: BoardLayout = [
    [0, 0, 1, 1, 1, 0, 0],
    [0, 1, 1, 1, 1, 1, 0],
    [1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1],
    [0, 1, 1, 1, 1, 1, 0],
    [0, 0, 1, 1, 1, 0, 0]
];

// The "annoying" difficult layout, now as Level 3
const LEVEL_3_LAYOUT: BoardLayout = [
    [0, 0, 1, 1, 1, 0, 0],
    [0, 1, 1, 1, 1, 1, 0],
    [1, 1, 0, 1, 0, 1, 1],
    [1, 1, 1, 1, 1, 1, 1],
    [1, 1, 0, 1, 0, 1, 1],
    [0, 1, 1, 1, 1, 1, 0],
    [0, 0, 1, 1, 1, 0, 0]
];


export const LEVELS: Level[] = [
    {
        layout: LEVEL_1_LAYOUT,
        startHole: { row: 3, col: 3 }
    },
    {
        layout: LEVEL_2_LAYOUT,
        startHole: { row: 0, col: 3 } // Asymmetric starting hole
    },
    {
        layout: LEVEL_3_LAYOUT,
        startHole: { row: 3, col: 3 } // Classic center start for a tricky board
    }
];
