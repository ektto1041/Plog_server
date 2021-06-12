/**
 * Root Router
 */

let express = require('express');
let router = express.Router();

const { getMenus, getMenuType } = require('./routes/menuController');
const { getPostCount, getPosts } = require('./routes/postController');

// 모든 메뉴를 가져오는 api
// return: Array {MENU_ID: int, NAME: string, SORT: int, TYPE: string}
router.get('/menus', getMenus);
// 해당 메뉴의 Type을 가져오는 api
// return: Array {TYPE: string}
router.get(`/menuType`, getMenuType);

// 해당 메뉴의 모든 글의 갯수를 가져오는 api
// return:
router.get(`/postCount`, getPostCount);
// 해당 메뉴의 모든 글과 개수를 가져오는 api
// return: Array {POST_ID: int, TITLE: string, CONTENT: string, UPD_DATE: string}
router.get(`/posts`, getPosts);

module.exports = router;