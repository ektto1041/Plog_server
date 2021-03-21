const express = require('express');
const app = express();
const port = 4000;
const router = require('./src/router');

// 미들웨어
app.use('/', router);

// server start
app.listen(port, () => {
  console.log("listen");
});