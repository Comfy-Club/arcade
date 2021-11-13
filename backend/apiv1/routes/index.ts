import express from 'express';
let router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
	res.json({ message: 'Not a valid path' });
});

export default router;
