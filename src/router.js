/**
 * Root Router
 */

let express = require('express');
let router = express.Router();
const passport = require('passport')
const KakaoStrategy = require('passport-kakao').Strategy

const { getMenus, getMenuType } = require('./controller/menuController');
const { getPostCount, getPosts } = require('./controller/postController');
const { loginKakao, loginKakaoCallback } = require('./controller/loginController');

passport.use(new KakaoStrategy({
    clientID : 'b0f4345373406a8c736508308454e8a6',
    callbackURL : 'http://localhost:4000/oauth/kakao/callback',
  },
  (accessToken, refreshToken, profile, done) => {
    // 사용자의 정보는 profile에 들어있다.
    console.log('$$$ token', accessToken);
  }
))

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

router.get(`/oauth/kakao`, passport.authenticate('kakao'));
router.get('/oauth/kakao/callback', (req, res) => {
  console.log('$$$ callback', req.body);
  res.send('hello');
});

module.exports = router;