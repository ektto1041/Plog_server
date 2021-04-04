let db = require("../databases/mysqlConn");

const getPostCount = (req, res) => {
  db.getConnection((err, con) => {
    const menuId = req.query.menuId;

    const q = `
      select count(*) as count
      from post
      where MENU_ID=${menuId}
    `;

    con.query(q, (err, rows, fields) => {
      console.log(rows[0]);
      res.send(rows);
    });
  });
};

const getPosts = (req, res) => {
  db.getConnection((err, con) => {
    const menuId = req.query.menuId;
    const offset = (parseInt(req.query.offset) - 1) * 10;
    const limit = req.query.limit;

    let q = `
      select count(*) as count
      from post
      where MENU_ID=${menuId}
    `;

    con.query(q, (err, rows, fields) => {
      const count = rows[0].count;

      const q = `
        select
          POST_ID,
          TITLE,
          CONTENT,
          REG_DATE,
          UPD_DATE,
          VIEW
        from post
        where MENU_ID=${menuId}
        order by UPD_DATE desc
        limit ${offset}, ${limit}
      `;

      con.query(q, (err, rows, fields) => {
        res.send({
          count,
          postList: rows,
        });
      });
    });
  });
};

module.exports = {
  getPostCount,
  getPosts,
};
