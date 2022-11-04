const express = require('express');
const { index } = require('../controllers');

const r = express.Router();

r.get('/', index);

module.exports = r;
