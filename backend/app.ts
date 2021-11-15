import express from 'express';
import cors from 'cors';
import path from 'path';
const app = express();

// Web socket container
import ComfySocket from './websockets/ComfySocket';
const WebSocket = new ComfySocket();

// Absolute project paths
const SHARED_PATH = path.resolve(__dirname, '..', 'shared');
const BACKEND_PATH = path.resolve(__dirname, '..', 'backend');
const FRONTEND_PATH = path.resolve(__dirname, '..', 'frontend');

// Set the public folder to Sveltes static files
app.use(express.static(path.resolve(FRONTEND_PATH, 'public')));
app.use(express.static('public'));
app.get('/', (req, res) => {
	res.sendFile(__dirname + '/public/index.html');
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// Routers
import apiv1 from './apiv1/index';
app.use('/api/v1', apiv1);

app.use((req, res, next) => {
	res.status(404).json({ message: '404 Page not found' });
});

// Class Game
// Class GameList

// Class Lobby
// Class LobbyList

// Class Player
// Class PlayerList

export default app;
