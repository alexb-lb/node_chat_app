/** Created by alex on 24.09.2017 **/
'use strict';

// node-modules
const express = require('express');
const path = require('path');

// models

// variables
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
let app = express();


// middleware
app.use(express.static(publicPath));

// insert new elem. Get user obj from DB by it token from client (in a authenticate), then save it
app.get('/', (req, res) => {
  res.send(publicPath + '/index.html');
});

app.listen(port, () => {
  console.log(`server is up on port ${port}`);
});