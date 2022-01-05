import { Game } from './game/Game';

let gridWidth = 25;
let gridHeight = 25;

let Minesweeper = new Game(gridWidth, gridHeight);
Minesweeper.click('left', [10, 10]);
Minesweeper.logTiles;
