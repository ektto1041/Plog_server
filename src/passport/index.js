const passport = require("passport");
const local = require("./localStrategy");
const kakao = require("./kakaoStrategy");
const User = require("../../models/user");

module.exports = () => {
  // req.session에 사용자 id 저장
  passport.serializeUser((user, done) => {
    console.log("[serialize] user info: ", user);
    done(null, user.id);
  });

  // request가 들어올때마다 passport.session() 미들웨어에 의해 호출되는 함수
  // 조회된 사용자 정보를 req.user에 저장
  passport.deserializeUser((id, done) => {
    console.log("[deserialize] user id: ", id);
    User.findOne({ where: { id } })
      .then((user) => done(null, user))
      .catch((e) => done(e));
  });

  // Strategy 등록
  local();
  kakao();
};
