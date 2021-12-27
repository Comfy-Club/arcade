import WebSocket from 'ws';

import LobbyList from './lobby/LobbyList';
import PlayerList from './player/PlayerList';
import Player from './player/Player';
import SocketList from './sockets/SocketList';

export default class DataHandler {
	static LOBBY_LIST: LobbyList = new LobbyList();
	static PLAYER_LIST: PlayerList = new PlayerList();
	static SOCKET_LIST: SocketList = new SocketList();
	static SOCKET_WEAKMAP: WeakMap<WebSocket, Player> = new WeakMap();
}
