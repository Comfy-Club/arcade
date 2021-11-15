import WebSocket, { WebSocketServer } from 'ws';
import { Player } from '../data/player/Player';
import ComfySocketHandler from './ComfySocketHandler';
import { v4 as uuid } from 'uuid';

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

		this._wss.on('connection', (socket) => {
			console.log('Client connected');
			this.onConnection(socket);

			socket.on('message', (message) => {
				console.log('received: %s', message);
			});

			socket.on('close', (socket) => {
				console.log('Client disconnected');
				this.onDisconnection(socket);
			});
		});
	}

	public onConnection(socket: any) {
		this._Handler.onConnection(socket, new Player(uuid()));
	}

	public onDisconnection(socket: any) {
		this._Handler.onDisconnection(socket);
	}
}
