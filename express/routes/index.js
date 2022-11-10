import express from 'express';
import baseContoller from '../controllers/index.js';

const { index } = baseContoller;
const r = express.Router();

r.get('/', index);

export default r;
