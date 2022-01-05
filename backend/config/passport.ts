import { Strategy as LocalStrategy } from 'passport-local';
import bcrypt from 'bcrypt';
import passport from 'passport';

import { UserDAO, User } from '../models/User';

function initializePassport() {

  passport.use(new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
    let user: User = await UserDAO.findByEmail(email);
    if (!user.email) return done(null, false, { message: 'Incorrect email address.' });

    let isPasswordCorrent = await bcrypt.compare(password, user.password);
    if (isPasswordCorrent) {
      return done(null, user);
    } else {
      return done(null, false, { message: 'Incorrect password.' });
    }
  }));
  
  // TODO: Be more explicit about types of parameters
  passport.serializeUser<any, any>((_req, user, done) => { 
    done(null, user);
  });
  passport.deserializeUser(async (id: number, done) => {
    let user = await UserDAO.findById(id);
    done(null, user);
  });
}

export default initializePassport;
