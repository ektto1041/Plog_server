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

router.get('/getAll', (req, res) => {
  const q = 'SELECT * FROM postings left join menu on postings.MENU_ID = menu.ID';

  conn.query(q, (err, rows, fields) => {
    console.log(rows);
    res.send(rows);
  })
})

router.get('/getAllSideMenu', (req, res) => {
  const q = 'select menu.NAME from menu left join owners on menu.OWNER_ID = owners.ID where owners.NAME = "공용"';

  conn.query(q, (err, rows, fields) => {
    console.log(rows);
    res.send(rows);
  })
})

router.get('/post', (req, res) => {
  const { userId } = req.query;

  const query = `select b.POST_ID, b.TITLE, b.CONTENT, b.REG_DATE, b.UPD_DATE, c.MENU_ID, c.PRNT_ID from users a inner join post b on a.DEFAULT_POST_ID=b.POST_ID inner join menu c on b.MENU_ID=c.MENU_ID where a.USER_ID=${userId}`

  conn.query(query, (err, rows, fields) => {
    res.send(rows);
  })
});

router.get('/users', (req, res) => {
  const query = `
    select USER_ID,NAME
    from users
  `

  conn.query(query, (err, rows, fields) => {
    res.send(rows);
  })
});

router.get('/menus', (req, res) => {
  const userId = req.query.userId;

  const query = `
    select a.MENU_ID, a.PRNT_ID, a.NAME, a.LEVEL
    from menu a
    inner join users b on a.USER_ID = b.USER_ID
    where a.USER_ID=${userId}
  `;

  conn.query(query, (err, rows, fields) => {
    res.send(rows);
  })
})

module.exports = router;