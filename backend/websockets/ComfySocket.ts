import WebSocket, { WebSocketServer } from 'ws';
import { Player } from '../data/player/Player';
import ComfySocketHandler from './ComfySocketHandler';
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
			console.log('Client connected');

			this.onConnection(socket);

			socket.on('message', (message: string) => {
				console.log('received: %s', message);
			});

			socket.on('close', (socket: WebSocket) => {
				this.onDisconnection(socket);
			});
		});
	}

	public onConnection(socket: WebSocket) {
		this._Handler.onConnection(socket, new Player(uuid()));
		// console.log(this._wss.clients);
	}

	public onDisconnection(socket: WebSocket) {
		this._Handler.onDisconnection(socket);
	}

	public getClients() {
		return this._wss.clients;
	}
}
