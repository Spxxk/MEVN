// Import required modules
import cors from 'cors';
import express from 'express';
import session from 'express-session';
import "./passport.js";
import passport from 'passport';
import './db.js'; // Import Mongoose configuration
import generateSalt from './saltGenerator.js';
import authRoutes from './routes/auth.js';
import eventRoutes from './routes/event.js';
import teamRoutes from './routes/team.js';
import leagueRoutes from './routes/league.js';
import axios from 'axios';


// Initialize Express app
const app = express();
const corsConfig = {
  origin: true,
  credentials: true,
};

app.use(cors(corsConfig));
app.options('*', cors(corsConfig));
app.use(express.json());


// Middleware setup
app.set('view engine', 'ejs'); // Assuming you're using EJS for templating
app.use(express.urlencoded({ extended: false }));
app.use(session({
  secret: `${generateSalt()}`, // Replace 'secret' with your session secret
  resave: false,
  saveUninitialized: false
}));

// Mount authentication routes
app.use(passport.initialize());
app.use(passport.session());
app.use('/auth', authRoutes); // make sure the above two lines are set up before this
app.use('/event', eventRoutes);
app.use('/team', teamRoutes);
app.use('/league', leagueRoutes);

const isAuthenticated = (req, res, next) => {
  // Passport adds 'req.user' property if user is authenticated
  if (req.isAuthenticated()) {
    // User is authenticated, proceed to the next middleware
    return next();
  }
  // User is not authenticated, redirect to login page or send error response
  res.redirect('/dashboard'); // Redirect to login page
};

// Middleware function to check if user has specific role/permission
const hasPermission = (requiredRole) => {
  return (req, res, next) => {
    // Check if user has the required role/permission
    if (req.user && req.user.role === requiredRole) {
      // User has the required role/permission, proceed to the next middleware
      return next();
    }
    // User does not have the required role/permission, send error response
    res.status(403).send('Forbidden'); // Send 403 Forbidden status
  };
};

// Define routes
app.get('/', (req, res) => {
  res.send('Welcome to the application!');
});

app.get('/login', (req, res) => {
  res.send('This is the aaa Page')
});

app.get('/dashboard', (req, res) => {
  res.send('Welcome User to the dashboard!');
});

app.get('/logoutConfirmed', (req, res) => {
  res.send('You have logged out!');
});

// Example route that requires authentication and specific role
app.get('/admin', isAuthenticated, hasPermission('admin'), (req, res) => {
  // Route handler for admin route
  res.send('Welcome to the admin dashboard!');
});

app.post('/notify', async (req, res) => {
  const data = JSON.stringify({
    "Messages": [{
      "From": { "Email": "owenchend@gmail.com", "Name": "owen" },
      "To": [{ "Email": req.body['email'], "Name": "jason" }], //tester
      "Subject": "Event Reminder",
      "TextPart": `Reminder of the ${req.body['res']['type']}: ${req.body['res']['game']}. This event happens at ${req.body['res']['date'].substring(0, 10)} ${req.body['res']['date'].substring(11, 20)}`
    }]
  });

  const config = {
    method: 'post',
    url: 'https://api.mailjet.com/v3.1/send',
    data: data,
    headers: { 'Content-Type': 'application/json' },
    auth: { username: '68df50c8a409c1990fe8d020fba91e26', password: '853f55b8267d3d01c5494b5f8531227b' },
  };

  return axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
      console.log(error);
    });

});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
