const express = require('express');
const app = express();
var path = require('path');
const port = 3000;

app.set('views', path.join('gphotos-album-organizer/views'));
// Set EJS as the view engine
app.set('view engine', 'ejs');

// Route to render the EJS view
app.get('/', (req, res) => {
  res.render('index', { title: 'My Web App' });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});