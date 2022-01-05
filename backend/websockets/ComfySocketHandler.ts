import WebSocket, { WebSocketServer } from 'ws';
import jwt from 'jsonwebtoken';
import SocketList from '../data/sockets/SocketList';
import PlayerList from '../data/player/PlayerList';
import Player from '../data/player/Player';
import SocketMap from '../data/sockets/SocketMap';
import { v4 as uuid } from 'uuid';
import DataHandler from '../data/DataHandler';

export default class ComfySocketHandler {
	constructor() {}

	public onConnection(socket: WebSocket, player: Player) {
		if (DataHandler.SOCKET_WEAKMAP.has(socket)) return;
		let id = uuid();

		console.log(
			`\x1b[32m%s\x1b[0m`,
			'Connection received on id ' + player.id
		);

		this._storeConnection(socket, player);
	}

	public onMessage(socket: WebSocket, message: string): void {
		let player = DataHandler.SOCKET_WEAKMAP.get(socket);
		if (!player) return;
		console.log(`${player.id} sent: ${message}`);
	}

	public onDisconnection(socket: WebSocket): void {
		this._terminateConnection(socket);
	}

	private _storeConnection(socket: WebSocket, player: Player): void {
		DataHandler.SOCKET_LIST.socketList[player.id] = socket;
		DataHandler.PLAYER_LIST.playerList[player.id] = player;
		DataHandler.SOCKET_WEAKMAP.set(socket, player);
		console.log('\x1b[36m%s\x1b[0m', 'Connection stored');
	}

	private _terminateConnection(socket: WebSocket): void {
		let player = DataHandler.SOCKET_WEAKMAP.get(socket);
		if (!player) return;
		DataHandler.SOCKET_LIST.removeWithPlayerId(player.id);
		DataHandler.PLAYER_LIST.removeWithPlayerId(player.id);
		DataHandler.SOCKET_WEAKMAP.delete(socket);
		console.log(
			'\x1b[31m%s\x1b[0m',
			'Connection terminated on id ' + player.id
		);
	}
}
