import express from 'express';
const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

// TODO: Sessions and cookies
// TODO: Link Player to Session
app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});

import indexRouter from './routes/index';
app.use('/', indexRouter);

import gamesRouter from './routes/games';
app.use('/games', gamesRouter);

import lobbiesRouter from './routes/lobbies';
app.use('/lobbies', lobbiesRouter);

app.use((req, res, next) => {
	res.status(404).render('404', {
		address: req.protocol + '://' + req.get('host') + req.originalUrl,
	});
});

// Class Game
// Class GameList

// Class Lobby
// Class LobbyList

// Class Player
// Class PlayerList
