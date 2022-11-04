const express = require('express');
const cors = require('cors');
const { dbConnect } = require('./config/db');
const baseRoutes = require('./routes');
const postRoutes = require('./routes/posts');

const app = express();
const port = 4000;

app.use(cors());
app.use(baseRoutes);
app.use('/posts', postRoutes);

dbConnect().then(() => {
  app.listen(port, () => {
    console.log(`Server running on ${port}`);
  });
}).catch(() => {
  console.error('Unable to connect to DB');
});
