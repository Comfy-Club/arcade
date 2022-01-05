import Tile from './Tile';
import { nearbyTileHelper } from './nearbyTileHelper';

export default class Board {
	public boardTiles: Tile[][];
	public boardHeight: number;
	public boardWidth: number;
	public bombAmount: number;

	private _maximumBoardSize: number;
	private _minimumBoardSize: number;
	private _defaultBoardSize: number;

	constructor(bombAmount: number, gridWidth: number, gridHeight: number) {
		this.boardTiles = [];
		this._maximumBoardSize = 64;
		this._minimumBoardSize = 8;
		this._defaultBoardSize = 16;
		this.boardHeight = this._validateBoardSize(gridHeight)
			? gridHeight
			: this._defaultBoardSize;
		this.boardWidth = this._validateBoardSize(gridWidth)
			? gridWidth
			: this._defaultBoardSize;
		this.bombAmount = bombAmount;

		this._populateTiles();
		this._generateBombs();
		this._calculateNearbyBombs();
		this.logBombs();
	}

	public setBomb(coordinates: [number, number]) {
		let selectedTile = this.boardTiles[coordinates[0]][coordinates[1]];
		if (selectedTile.tileState !== 2 && selectedTile.tileState !== 3)
			selectedTile.tileState = 0; // 0 = UNCHECKED
		if (selectedTile.isSafe()) {
			this._incrementNearbyTilesBombCounters(coordinates);
		}
		selectedTile.isBomb = true;
	}

	public isWithinBoard(coordinateX: number, coordinateY: number) {
		return (
			coordinateX < 0 ||
			coordinateX >= this.boardWidth ||
			coordinateY < 0 ||
			coordinateY >= this.boardHeight
		);
	}

	public logBombs() {
		let answer = '';
		for (let i = 0; i < this.boardWidth; i++) {
			for (let ii = 0; ii < this.boardHeight; ii++) {
				if (this.boardTiles[i][ii].isBomb) {
					answer += '\x1b[31mX \x1b[0m';
					continue;
				}
				if (this.boardTiles[i][ii].nearbyBombs === 0) {
					answer += '- ';
					continue;
				}
				answer += String(this.boardTiles[i][ii].nearbyBombs) + ' ';
			}
			answer += '\n';
		}
		console.log('Generated bombs: \n ------------ \n' + answer);
	}

	public logTiles() {
		let answer = '';
		for (let i = 0; i < this.boardWidth; i++) {
			for (let ii = 0; ii < this.boardHeight; ii++) {
				switch (this.boardTiles[i][ii].tileState) {
					case 0:
						answer += '⬜';
						break;
					case 1:
						answer += this.boardTiles[i][ii].nearbyBombs + ' ';
						break;
					case 2:
						answer += '✔ ';
						break;
					case 3:
						answer += '✘ ';
						break;
					default:
						break;
				}
			}
			answer += '\n';
		}
		console.log('Tile states: \n ------------ \n' + answer);
	}

	private _populateTiles() {
		for (
			let coordinateX = 0;
			coordinateX < this.boardWidth;
			coordinateX++
		) {
			this.boardTiles[coordinateX] = [];
			for (
				let coordinateY = 0;
				coordinateY < this.boardHeight;
				coordinateY++
			) {
				this.boardTiles[coordinateX][coordinateY] = new Tile();
			}
		}
	}

	private _generateBombs() {
		let bombCount = 0;
		while (bombCount < this.bombAmount) {
			let randomX = Math.floor(Math.random() * this.boardWidth);
			let randomY = Math.floor(Math.random() * this.boardHeight);
			if (this.boardTiles[randomX][randomY].isBomb) continue;
			this.boardTiles[randomX][randomY].isBomb = true;
			bombCount++;
		}
	}

	private _calculateNearbyBombs() {
		for (
			let coordinateX = 0;
			coordinateX < this.boardWidth;
			coordinateX++
		) {
			for (
				let coordinateY = 0;
				coordinateY < this.boardHeight;
				coordinateY++
			) {
				if (this.boardTiles[coordinateX][coordinateY].isSafe())
					continue;
				this._incrementNearbyTilesBombCounters([
					coordinateX,
					coordinateY,
				]);
			}
		}
	}

	private _incrementNearbyTilesBombCounters(coordinates: [number, number]) {
		for (let direction in nearbyTileHelper) {
			// Combine coordinates with offset directional coordinates resulting in a "nearby" tile
			let coordinateX = coordinates[0] + nearbyTileHelper[direction][0];
			let coordinateY = coordinates[1] + nearbyTileHelper[direction][1];

			// Check if coordinates are within board
			if (!this.isWithinBoard(coordinateX, coordinateY)) continue;

			// Increment nearby bomb counter
			this.boardTiles[coordinateX][coordinateY].nearbyBombs++;
		}
	}

	private _validateBoardSize(numberToValidate: number) {
		if (this._minimumBoardSize > numberToValidate) return false;
		if (this._maximumBoardSize < numberToValidate) return false;
		return true;
	}
}
