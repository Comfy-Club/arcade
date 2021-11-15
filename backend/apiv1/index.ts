import express from 'express';
let router = express.Router();

import gamesRouter from './routes/games';
router.use('/games', gamesRouter);

import lobbiesRouter from './routes/lobbies';
router.use('/lobbies', lobbiesRouter);

// 404
router.get('/', function (req, res) {
	res.status(404);
});

export default router;
