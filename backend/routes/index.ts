import express from 'express';
let router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
	res.render('index', { title: 'Frontpage' });
	let meme = setInterval(function () {
		// res.json('Hello');
	}, 1000);
});

export default router;
