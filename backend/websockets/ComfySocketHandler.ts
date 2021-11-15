import WebSocket from 'ws';
import SocketList from '../data/sockets/SocketList';
import PlayerList from '../data/player/PlayerList';
import { Player } from '../data/player/Player';
import SocketMap from '../data/sockets/SocketMap';

export default class ComfySocketHandler {
	public SOCKET_LIST: SocketList;
	public PLAYER_LIST: PlayerList;
	public SOCKET_MAP: SocketMap;

	constructor() {
		this.SOCKET_LIST = new SocketList();
		this.PLAYER_LIST = new PlayerList();
		this.SOCKET_MAP = new SocketMap();
	}

	public onConnection(socket: WebSocket, player: Player) {
		this.SOCKET_LIST.socketList[player.id] = socket;
		this.PLAYER_LIST.playerList[player.id] = player;
		// TODO: Store socket as key to uuid
		// this.SOCKET_MAP.addId(socket, player.id);
		console.log(this.PLAYER_LIST.playerList);
	}

	public onDisconnection(socket: WebSocket): void {
		// let player = this.PLAYER_LIST[socket.id];
		// if (player) {
		// 	delete this.PLAYER_LIST[socket.id];
		// 	delete this.SOCKET_LIST[socket.id];
		// }
	}
}
