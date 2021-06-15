const express = require('express');
const mongoose = require('mongoose');
const logger = require('morgan');

const PORT = process.env.PORT;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'));

mongoose.connect('mongodb://localhost/track', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
});

app.use(require('./routes/api.js'));
app.use(require('./routes/index.js'));

app.use(logger('dev'));

app.listen(PORT || 3000, () => {
  console.log(`App running on port ${PORT}!`);
});
