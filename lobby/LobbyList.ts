import { Lobby } from './Lobby';

interface ILobbyList {
	[key: string]: Lobby;
}

export class LobbyList {
	lobbyList: ILobbyList;

	constructor() {
		this.lobbyList = {};
	}
}
