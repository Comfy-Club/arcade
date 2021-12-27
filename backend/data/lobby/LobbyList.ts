import { Lobby } from './Lobby';

interface ILobbyList {
	[key: string]: Lobby;
}

export default class LobbyList {
	lobbyList: ILobbyList;

	constructor() {
		this.lobbyList = {};
	}
}
