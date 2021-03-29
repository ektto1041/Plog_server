let db = require('../databases/mysqlConn');

const getMenus = (req, res) => {
  db.getConnection((err, con) => {
    const q = `
      select *
      from menu
    `;

    con.query(q, (err, rows, fields) => {
      res.send(rows);
    });
  })
}

const getMenuType = (req, res) => {
  db.getConnection((err, con) => {
    const menuId = req.query.menuId;

    const q = `
      select TYPE
      from menu
      where MENU_ID=${menuId}
    `;
  
    con.query(q, (err, rows, fields) => {
      res.send(rows);
    })    
  })
}

module.exports = {
  getMenus,
  getMenuType,
}