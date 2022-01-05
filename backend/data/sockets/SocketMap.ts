import WebSocket from 'ws';

interface ISocketMap {
	[key: string]: string;
}

export default class SocketMap {
	public socketMap: ISocketMap;
	constructor() {
		this.socketMap = {};
	}

	public addId(socket: WebSocket, id: string) {
		this.socketMap[JSON.stringify(socket)] = id;
	}

	public getId(socket: WebSocket) {
		return this.socketMap[JSON.stringify(socket)];
	}
}
