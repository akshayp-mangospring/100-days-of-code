const mongoose = require('mongoose');

const dbConnect = () => mongoose.connect('mongodb://localhost:27017/', {
  dbName: 'posts',
  useNewUrlParser: true,
  useUnifiedTopology: true
});

module.exports = {
  dbConnect,
};
