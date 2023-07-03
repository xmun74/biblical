const path = require('path');
const express = require('express');

const router = express.Router();

// /와 리액트 biblical/web를 연결
router.use(express.static(path.join(__dirname, '../../web/dist')));
router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../../web/dist/index.html'));
});

// GET /
/* router.get('/', (req, res) => {
  console.log('야야2', __dirname);
  res.send(`GET / 요청 index.js`);
}); */

module.exports = router;
