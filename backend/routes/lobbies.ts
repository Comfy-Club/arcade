import express from 'express';
let router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
	res.render('lobbies', { title: 'Lobbies' });
});

router.get('/:id', (req, res) => {
	res.render('lobbies', { title: `Lobby ${req.params.id}` });
});

export default router;
