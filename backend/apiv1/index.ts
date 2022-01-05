import express from 'express';
let router = express.Router();

import gamesRouter from './routes/games';
router.use('/games', gamesRouter);

import lobbiesRouter from './routes/lobbies';
router.use('/lobbies', lobbiesRouter);

import registerRouter from './routes/register';
router.use('/register', registerRouter);

import loginRouter from './routes/login';
router.use('/login', loginRouter);

// 404
router.get('/', function (_req, res) {
	res.status(404);
});

export default router;
