import apiv1 from '../apiv1/index';
import initializePassport from './passport';

import path from 'path';
import express from 'express';
import session from 'express-session';
import flash from 'express-flash';
import passport from 'passport';
import cors from 'cors';

const app = express();

// Absolute project paths
// const SHARED_PATH = path.resolve(__dirname, '..', 'shared');
// const BACKEND_PATH = path.resolve(__dirname, '..', 'backend');
const FRONTEND_PATH = path.resolve(__dirname, '..', 'frontend');

// Set the public folder to Sveltes static files
app.use(express.static(path.resolve(FRONTEND_PATH, 'public')));
app.use(express.static('public'));
app.get('/', (_req, res) => {
	res.sendFile(__dirname + '/public/index.html');
});

app.use(express.urlencoded({ extended: true }));
app.use(session({ secret: 'gato cinza' }));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());
app.use(cors());

initializePassport();

// Routers
app.use('/api/v1', apiv1);

app.use((_req, res, _next) => {
	res.status(404).json({ message: '404 Page not found' });
});

export default app;
