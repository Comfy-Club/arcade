import WebSocket, { WebSocketServer } from 'ws';
import SocketList from '../data/sockets/SocketList';
import PlayerList from '../data/player/PlayerList';
import { Player } from '../data/player/Player';
import SocketMap from '../data/sockets/SocketMap';

export default class ComfySocketHandler {
	public PLAYER_LIST: PlayerList;
	public SOCKET_LIST: SocketList;
	public SOCKET_WEAKMAP: WeakMap<WebSocket, Player>;

	constructor() {
		this.PLAYER_LIST = new PlayerList();
		this.SOCKET_LIST = new SocketList();
		this.SOCKET_WEAKMAP = new WeakMap();
	}

	public onConnection(socket: WebSocket, player: Player) {
		if (this.SOCKET_WEAKMAP.has(socket)) return;
		this._storeConnection(socket, player);
	}

	public onDisconnection(socket: WebSocket): void {
		console.log('Player disconnected');
		this._terminateConnection(socket);
	}

	private _storeConnection(socket: WebSocket, player: Player): void {
		this.SOCKET_LIST.socketList[player.id] = socket;
		this.PLAYER_LIST.playerList[player.id] = player;
		this.SOCKET_WEAKMAP.set(socket, player);
		console.log('Connection stored');
	}

	private _terminateConnection(socket: WebSocket): void {
		let player = this.SOCKET_WEAKMAP.get(socket);
		if (!player) return;
		this.SOCKET_LIST.removeWithPlayerId(player.id);
		this.PLAYER_LIST.removeWithPlayerId(player.id);
		this.SOCKET_WEAKMAP.delete(socket);
		console.log('Connection terminated');
	}
}
