import express from 'express';
import cors from 'cors';
import db from './config/db.js';
import baseRoutes from './routes/index.js';
import postRoutes from './routes/posts.js';

const app = express();
const port = 4000;
const { dbConnect } = db;

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
