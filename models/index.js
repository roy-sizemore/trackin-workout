const express = require('express');
const mongoose = require('mongoose');

const PORT = 3000;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'));

mongoose.connect('mongodb://localhost/track', {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

// routes
app.use(require('./routes/api.js'));
app.use(require('./routes/index.js'));

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
