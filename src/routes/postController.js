let db = require("../databases/mysqlConn");
const Post = require("../../models/post");

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

// 해당 메뉴의 모든 게시글 가져오는 API
const getPosts = async (req, res) => {
  try {
    const menuId = req.query.id;
    const postList = await Post.findAll({ where: { menu_id: menuId } });
    res.json({ postList });
  } catch (e) {
    console.log("/getPosts error", e);
  }
};

module.exports = {
  getPostCount,
  getPosts,
};
