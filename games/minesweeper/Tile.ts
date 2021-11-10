enum TileState {
	UNCHECKED = 0,
	CHECKED,
	FLAGGED_RIGHT,
	FLAGGED_WRONG,
}

export default class Tile {
	public tileState: TileState;
	public nearbyBombs: number;
	public isBomb: boolean;

	constructor() {
		this.tileState = TileState.UNCHECKED;
		this.isBomb = false;
		this.nearbyBombs = 0;
	}

	// Return true if clicked on safe tile, false for game end
	public isSafe(): boolean {
		if (this.isBomb && this.tileState === TileState.UNCHECKED) return false;
		return true;
	}

	// Should a flag be put or removed from a tile state?
	// True for a flag, false for no flag
	public toggleFlag(): boolean {
		if (this.tileState === TileState.CHECKED) return false;

		if (this.tileState === TileState.UNCHECKED) {
			this._flag();
			return true;
		}

		this._unflag();
		return false;
	}

	private _flag(): void {
		if (this.isBomb) this.tileState = TileState.FLAGGED_RIGHT;
		else this.tileState = TileState.FLAGGED_WRONG;
	}

	private _unflag(): void {
		this.tileState = TileState.UNCHECKED;
	}
}
