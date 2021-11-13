import { Player } from './Player';

interface IPlayerList {
	[key: string]: Player;
}

export class PlayerList {
	playerList: IPlayerList;

	constructor() {
		this.playerList = {};
	}
}
