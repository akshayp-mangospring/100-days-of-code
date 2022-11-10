import express from 'express';
import postsContoller from '../controllers/posts.js';

const { index } = postsContoller;
const r = express.Router();

r.get('/', index);

export default r;
