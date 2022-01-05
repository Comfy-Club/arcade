import WebSocket, { WebSocketServer } from 'ws';
import Player from '../data/player/Player';
import ComfySocketHandler from './ComfySocketHandler';
import jwt from 'jsonwebtoken';
import { v4 as uuid } from 'uuid';
import { IncomingMessage } from 'http';

export default class ComfySocket {
	public port: number;
	public address: string;

	private _wss: WebSocketServer;
	private _Handler: ComfySocketHandler;

	constructor() {
		this.port = Number(process.env.PORT_WEBSOCKET) || 8080;
		this.address = process.env.ADDRESS || 'localhost';

		this._Handler = new ComfySocketHandler();

		this._wss = new WebSocketServer({ port: this.port });

		// WebSocketServer listener
		this._wss.on('connection', (socket: WebSocket) => {
			this.onConnection(socket);

			socket.on('message', (message: string) => {
				this.onMessage(socket, message);
			});

			socket.on('close', () => {
				this.onDisconnection(socket);
			});
		});
	}

	public onConnection(socket: WebSocket) {
		this._Handler.onConnection(socket, new Player(uuid()));
	}

	public onMessage(socket: WebSocket, message: string) {
		this._Handler.onMessage(socket, message);
	}

	public onDisconnection(socket: WebSocket) {
		this._Handler.onDisconnection(socket);
	}

	public getClients() {
		return this._wss.clients;
	}
}
