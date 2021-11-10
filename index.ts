import { v4 as uuid } from 'uuid';
import { Player } from './player/Player';

const express = require('express');
const server = express();
const port = 3000;

// TODO: Sessions and cookies
// TODO: Link Player to Session
server.get('/', (req: any, res: any) => {
	res.send(uuid());
});

server.get('/arcade', (req: any, res: any) => {
	res.send('Hello World!');
});

server.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});

// Class Game
// Class GameList

// Class Lobby
// Class LobbyList

// Class Player
// Class PlayerList
