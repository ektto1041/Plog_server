var express = require('express');
var router = express.Router();

// 디비 커넥션 모듈로 분리
const mysql = require('mysql');
const conn = mysql.createConnection({
  host  : 'localhost',
  user  : 'root',
  password  : 'tmsp2zm',
  database  : 'plog'
});
conn.connect();

// 라우터 파일로 분리

// 모든 메뉴를 가져오는 api
// return: Array {MENU_ID: int, NAME: string, SORT: int}
router.get('/menus', (req, res) => {
  const q = `
    select *
    from menu
  `;

  conn.query(q, (err, rows, fields) => {
    res.send(rows);
  })
})

module.exports = router;