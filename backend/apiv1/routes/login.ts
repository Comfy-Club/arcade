import express from 'express';
import passport from 'passport';

let router = express.Router();

router.get('/', (_req, res) => {
  res.send("Login page!");
});

router.post('/', passport.authenticate('local', { failureRedirect: '/login'} ), (_req, res) => {
  res.send("It worked!");
});

export default router;
