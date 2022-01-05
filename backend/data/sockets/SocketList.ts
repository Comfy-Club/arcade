import WebSocket from 'ws';
import { v4 as uuid } from 'uuid';

export interface ISocketList {
	// index: uuid
	[index: string]: WebSocket;
}

export default class SocketList {
	public socketList: ISocketList;

	constructor() {
		this.socketList = {};
	}

	public removeWithPlayerId(id: string) {
		delete this.socketList[id];
	}
}
