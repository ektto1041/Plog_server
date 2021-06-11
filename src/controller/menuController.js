let db = require('../databases/mysqlConn');
const Menu = require('../../models/menu');

const getMenus = async (req, res) => {
  const menus = await Menu.findAll();
  res.json(menus);
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