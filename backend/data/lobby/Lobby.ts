import { Player } from '../player/Player';

export class Lobby {
	lobbyID: string;
	lobbyName: string;
	lobbyPassword: string | undefined;
	lobbyOwner: Player;
	lobbyPlayers: Player[];
	lobbyMaxPlayers: number;
	lobbyGame: string | undefined;

	constructor(
		lobbyName: string,
		lobbyPassword: string = undefined,
		lobbyOwner: Player,
		lobbyMaxPlayer: number,
		lobbyGame: string | undefined
	) {
		this.lobbyID = '';
		this.lobbyName = lobbyName;
		this.lobbyPassword = lobbyPassword;
		this.lobbyOwner = lobbyOwner;
		this.lobbyPlayers;
		this.lobbyMaxPlayers = lobbyMaxPlayer;
		this.lobbyGame = lobbyGame;
	}
}
