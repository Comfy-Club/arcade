import express from 'express';
import { v4 as uuid } from 'uuid';
let router = express.Router();

// Test games
let Games = [
	{
		name: 'test',
		id: uuid(),
		type: 'minesweeper',
	},
	{
		name: 'test2',
		id: uuid(),
		type: 'not minesweeper',
	},
];

/* GET home page. */
router.get('/', (req, res) => {
	res.json({ ...Games });
});

router.get('/:id', (req, res) => {
	res.json({ title: `Game ${req.params.id}` });
});

export default router;
