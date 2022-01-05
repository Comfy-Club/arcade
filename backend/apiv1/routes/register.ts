import express from 'express';
import bcrypt from 'bcrypt';

import { User, UserDAO } from '../../models/User';

let router = express.Router();

router.get('/', (_req, res) => {
  res.send("Hello World!");
});

router.post('/', async (req, res) => {
  try {
    let hashedPassword = await bcrypt.hash(req.body.password, 10)
    let username = req.body.name;
    let email = req.body.email;

    UserDAO.addUser(username, email, hashedPassword);
    res.send("User created!");
  } catch {
    res.send("There was an error!");
  }
});

export default router;
