import express from 'express';
let router = express.Router();

import indexRouter from './routes/index';
router.use('/', indexRouter);

import gamesRouter from './routes/games';
router.use('/games', gamesRouter);

import lobbiesRouter from './routes/lobbies';
router.use('/lobbies', lobbiesRouter);

export default router;
