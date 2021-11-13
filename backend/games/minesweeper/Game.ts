import Board from './Board';
import Tile from './Tile';
import { nearbyTileHelper } from './nearbyTileHelper';

enum GameState {
	PLAYING,
	PAUSED,
	WON,
	LOST,
}

export class Game {
	public gameState: GameState;
	private _Board: Board;
	private _tilesLeft: number;

	constructor(
		gridWidth: number = 16,
		gridHeight: number = 16,
		bombAmount: number = (gridWidth * gridHeight) / 8
	) {
		// TODO: Handle error more gracefully and move to a better place
		if (gridWidth * gridHeight < bombAmount) {
			let tooManyBombsForBoardError = `Grid can't fit ${bombAmount} bombs, number exceeds total grid size (${
				gridHeight * gridWidth
			}) by ${bombAmount - gridWidth * gridHeight}`;
			throw new Error(tooManyBombsForBoardError);
		}
		this.gameState = GameState.PLAYING;
		this._Board = new Board(bombAmount, gridWidth, gridHeight);
		this._tilesLeft = gridWidth * gridHeight - bombAmount;
	}

	get boardWidth(): number {
		return this._Board.boardWidth;
	}

	get boardHeight(): number {
		return this._Board.boardHeight;
	}

	get logBombs(): void {
		return this._Board.logBombs();
	}

	get logTiles(): void {
		return this._Board.logTiles();
	}

	public checkGameState() {
		if (this._tilesLeft === 0) this._win();
		if (this.gameState === GameState.LOST) this._lose();
	}

	public click(clickType: string, coordinates: [number, number]) {
		let targetedTile =
			this._Board.boardTiles[coordinates[0]][coordinates[1]];

		if (clickType === 'left')
			this._clickHandlerLeft([coordinates[0], coordinates[1]]);
		if (clickType === 'right') this._clickHandlerRight(targetedTile);
	}

	public setBomb(coordinates: [number, number]) {
		this._Board.setBomb(coordinates);
		if (this._Board.boardTiles[coordinates[0]][coordinates[1]].isSafe())
			this._tilesLeft--;
	}

	private _clickHandlerLeft(coordinates: [number, number]) {
		let targetedTile =
			this._Board.boardTiles[coordinates[0]][coordinates[1]];

		if (targetedTile.isBomb) return this._lose();
		targetedTile.tileState = targetedTile.tileState = 1; // 1 = CHECKED

		if (targetedTile.nearbyBombs !== 0) return;
		for (let direction in nearbyTileHelper) {
			let coordinateX = coordinates[0] + nearbyTileHelper[direction][0];
			let coordinateY = coordinates[1] + nearbyTileHelper[direction][1];

			// Check if coordinates are within board
			if (this._Board.isWithinBoard(coordinateX, coordinateY)) continue;

			let newTargetedTile =
				this._Board.boardTiles[coordinateX][coordinateY];

			if (newTargetedTile.tileState !== 0) continue;

			if (newTargetedTile.isSafe()) {
				newTargetedTile.tileState = 0; // 1 = CHECKED

				// Out of bounds access error but that's fine since this is TypeScript not C
				// 10 minutes later ->...after all it turned out not to be fine.
				// 1h later -> Now it's fixed and you just have to use your imagination what used to live on the line below.
				this._clickHandlerLeft([coordinateX, coordinateY]);
			}
		}
	}

	private _clickHandlerRight(targetedTile: Tile) {
		targetedTile.toggleFlag();
	}

	private _win() {
		console.log('You just won the game');
		this.gameState = GameState.WON;
	}

	private _lose() {
		console.log('You just lost the game');
		this.gameState = GameState.LOST;
	}
}
