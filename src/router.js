var express = require('express');
var router = express.Router();

// 디비 커넥션 모듈로 분리
const mysql = require('mysql2');
const conn = mysql.createConnection({
  host  : 'localhost',
  user  : 'root',
  password  : 'tmsp2zm',
  database  : 'plog'
});
conn.connect();

// 라우터 파일로 분리

// 모든 메뉴를 가져오는 api
// return: Array {MENU_ID: int, NAME: string, SORT: int, TYPE: string}
router.get('/menus', (req, res) => {
  const q = `
    select *
    from menu
  `;

  conn.query(q, (err, rows, fields) => {
    res.send(rows);
  })
})

// 해당 메뉴의 Type을 가져오는 api
// return: Array {TYPE: string}
router.get(`/menuType`, (req, res) => {
  const menuId = req.query.menuId;

  const q = `
    select TYPE
    from menu
    where MENU_ID=${menuId}
  `;

  conn.query(q, (err, rows, fields) => {
    res.send(rows);
  })
})

// 해당 메뉴의 모든 글의 갯수를 가져오는 api
// return:
router.get(`/postCount`, (req, res) => {
  const menuId = req.query.menuId;

  const q = `
    select count(*) as count
    from post
    where MENU_ID=${menuId}
  `;

  conn.query(q, (err, rows, fields) => {
    console.log(rows[0]);
    res.send(rows);
  })
});

// 해당 메뉴의 모든 글과 개수를 가져오는 api
// return: Array {POST_ID: int, TITLE: string, CONTENT: string, UPD_DATE: string}
router.get(`/posts`, (req, res) => {
  const menuId = req.query.menuId;
  const offset = (parseInt(req.query.offset)-1) * 10;
  const limit = req.query.limit;

  let q = `
    select count(*) as count
    from post
    where MENU_ID=${menuId}
  `;

  conn.query(q, (err, rows, fields) => {
    const count = rows[0].count;

    const q = `
      select POST_ID, TITLE, CONTENT, UPD_DATE
      from post
      where MENU_ID=${menuId}
      order by UPD_DATE desc
      limit ${offset}, ${limit}
    `;

    conn.query(q, (err, rows, fields) => {
      res.send({
        count,
        postList: rows,
      });
    })
  });
});

module.exports = router;