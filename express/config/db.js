import mongoose from 'mongoose';

const dbConnect = () => mongoose.connect('mongodb://localhost:27017/', {
  dbName: 'posts',
  useNewUrlParser: true,
  useUnifiedTopology: true
});

export default {
  dbConnect,
};
