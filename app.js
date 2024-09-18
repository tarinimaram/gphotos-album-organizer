const express = require('express');
const app = express();
var path = require('path');
const port = 3000;
require('dotenv').config();
const { OAuth2Client } = require('google-auth-library');

app.set('views', path.join('gphotos-album-organizer/views'));
// Set EJS as the view engine
app.set('view engine', 'ejs');


// Create an OAuth 2.0 client using the client ID and secret
const oauth2Client = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);

// Google OAuth 2.0 Scopes
const scopes = [
  'https://www.googleapis.com/auth/photoslibrary.readonly', // For accessing Google Photos
  'https://www.googleapis.com/auth/userinfo.profile', // Access user profile info
];

// Route to render the button
app.get('/', (req, res) => {
  const url = oauth2Client.generateAuthUrl({
    access_type: 'offline', // For getting a refresh token
    scope: scopes, // Specify the required scopes
  });
  
  res.render('index', { url: url });
});

// Route to handle Google OAuth callback
app.get('/auth/google/callback', async (req, res) => {
  const code = req.query.code;
  
  if (code) {
    try {
      // Get the access token using the OAuth code
      const { tokens } = await oauth2Client.getToken(code);
      oauth2Client.setCredentials(tokens);

      res.send('Authentication successful! You can now access Google Photos.');
    } catch (err) {
      res.send('Error while authenticating: ' + err);
    }
  } else {
    res.send('No authentication code provided.');
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
