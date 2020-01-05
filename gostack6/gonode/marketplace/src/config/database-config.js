const mongoose = require('mongoose');

const database = mongoose.connect(
  process.env.DATABASE,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: true,
  },
  () => {
    console.log('Database was connected');
  },
);

module.exports = database;
