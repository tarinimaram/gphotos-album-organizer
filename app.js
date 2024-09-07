const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static('public'));

// Define a route for the homepage
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// about page
app.get('/about', (req, res) => {
    res.send('This is the about page.');
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});

