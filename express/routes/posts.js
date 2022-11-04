const express = require('express');
const { index } = require('../controllers/posts');

const r = express.Router();

r.get('/', index);

module.exports = r;
