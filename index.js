const express = require('express');
const axios = require('axios');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Function to ping the specified URL
const pingURL = async (url) => {
  try {
    await axios.get(url);
    console.log(`Pinged ${url}`);
  } catch (error) {
    console.error(`Error pinging ${url}:`, error);
  }
};

// Endpoint to trigger the ping manually
app.get('/ping', async (req, res) => {
  const url = req.query.url;
  if (url) {
    await pingURL(url);
    res.send(`Pinged ${url}`);
  } else {
    res.status(400).send('URL parameter is required');
  }
});

// Ping the specified URL every 5 minutes
const urlToPing = 'https://b634d748-22a7-448a-84c6-54de053039cb-00-295euoqi2by21.pike.replit.dev/';
setInterval(() => {
  pingURL(urlToPing);
}, 5 * 60 * 1000); // 5 minutes in milliseconds

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});