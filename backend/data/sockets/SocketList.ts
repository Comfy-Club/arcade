import WebSocket from 'ws';

export interface ISocketList {
	// index: uuid
	[index: string]: WebSocket;
}

export default class SocketList {
	public socketList: ISocketList;

	constructor() {
		this.socketList = {};
	}
}
