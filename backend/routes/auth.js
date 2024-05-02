// routes/auth.js
import express from 'express';
import passport from 'passport';
const router = express.Router();
import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import enviro from 'dotenv'
enviro.config()

// POST request to handle login form submission
router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      console.log(err)
    }
    if (!user) {
      return res.status(401).send(info.message);
    }
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }

      const jwt_USER = {
        _id: user._id,
        role: user.role,
        email: user.email
      }
      const token = jwt.sign(jwt_USER, `${process.env.JWT_SECRET}`, { expiresIn: '1h' });
      return res.status(200).json({ token });
    });
  })(req, res, next);
});

router.get('/logout', (req, res) => {
  req.logout((err) => {
    if (err) {
      console.error('Error logging out:', err);
      // Handle error
      return res.status(500).send('Internal Server Error');
    }
  })
  res.redirect('/logoutConfirmed');
});

// router.post('/register'...)
router.post('/register', async (req, res) => {
  const { email, password, role } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: 'User already exists.' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      email,
      password: hashedPassword,
      role
    });

    // Save the new user to the database
    await newUser.save();

    return res.status(201).json({ message: 'User created successfully.' });
  } catch (error) {
    console.error('Error registering user:', error);
    return res.status(500).json({ message: 'Internal server error.' });
  }
});


export default router;
