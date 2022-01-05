import express from 'express';
let router = express.Router();

/* GET home page. */
router.get('/', (_req, res) => {
	res.json({ title: 'Lobbies' });
});

router.get('/:id', (req, res) => {
	res.json({ title: `Lobby ${req.params.id}` });
});

export default router;
