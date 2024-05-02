// passport.js
import passport from 'passport';
import bcrypt from 'bcryptjs';
import User from './models/User.js';
import { Strategy as LocalStrategy } from 'passport-local';

passport.use(new LocalStrategy(
  { usernameField: 'email' },
  async (email, password, done) => {
    try {
      console.log('Authenticating user:', email); // Log the email being authenticated
      const user = await User.findOne({ email });

      if (!user || !(await bcrypt.compare(password, user.password))) {
        console.log('Incorrect email or password.')
        return done(null, false, { message: 'Incorrect email or password.' });
      }

      return done(null, user);
    } catch (error) {
      return done(error);
    }
  }
));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});
