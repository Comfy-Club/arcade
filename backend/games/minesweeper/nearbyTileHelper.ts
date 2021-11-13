export const nearbyTileHelper = [
	/*
	Helps navigating the two dimensional array (Board)
	and removes the need for nested for loops in board navigation relating to finding nearby tiles

	boardNaviationHelper[index][direction]
	Reprents the board and the tiles around a selected tile
	S = Selected tile
	X = Unselected tile

	X  X  X  X  X
	X [0][1][2] X
	X [3] S [4] X
	X [5][6][7] X
	X  X  X  X  X
	*/
	[-1, 1], // UP Left
	[0, 1], // UP
	[1, 1], // UP Right
	[-1, 0], // LEFT
	[1, 0], // RIGHT
	[-1, -1], // DOWN Left
	[0, -1], // DOWN
	[1, -1], // DOWN Right

	/*
	Example:

	for (let direction in nearbyTileHelper) {
		let coordinateX = oldCoordinateX + nearbyTileHelper[direction][0];
		let coordinateY = oldCoordinateY + nearbyTileHelper[direction][1];

		...
	}
	*/
];
