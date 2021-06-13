let express = require("express");
const bcrypt = require("bcrypt");
const passport = require("passport");
const common = require("../utils/common");
const { isNotLoggedIn } = require("../passport/middlewares");
const User = require("../../models/user");
let router = express.Router();

// 회원가입
router.post("/join", isNotLoggedIn, async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const params = { name, email, password };
    const { key, result } = common.validate(params);
    if (!result) {
      let message = null;
      switch (key) {
        case "name":
          message = "이름을 입력해주세요.";
          break;
        case "email":
          message = "이메일을 입력해주세요.";
          break;
        case "password":
          message = "비밀번호를 입력해주세요.";
          break;
      }
      return res.json({ status: "FAIL", message });
    }

    // 기존재 유저 체크
    const exUser = await User.findOne({ where: { email } });
    if (exUser) {
      return res.json({
        status: "FAIL",
        message: "이미 존재하는 이메일입니다.",
      });
    }

    // 비밀번호 암호화
    const hash = await bcrypt.hash(password, 12);

    // DB에 저장
    await User.create({
      name,
      email,
      password: hash,
    });

    return res.json({ status: "OK", message: "회원가입에 성공했습니다." });
  } catch (e) {
    console.log("Join Error", e);
    return next(e);
  }
});

// 로그인
router.post("/login", (req, res, next) => {
  passport.authenticate("local", (authError, user, info) => {
    if (authError) {
      // 로그인 에러
      console.log("Auth Router authError:", authError);
      return next(e);
    }
    if (!user) {
      // 로그인 실패
      console.log("Auth Router Error: 로그인 실패");
      return res.json({ status: "FAIL", message: info.message });
    }

    // req.login() 실행되면 세션에 user가 추가됨
    return req.login(user, (loginError) => {
      if (loginError) {
        console.log("Auth Router loginError:", loginError);
        return next(loginError);
      }
      return res.json({ status: "OK", user });
    });
  })(req, res, next);
});

module.exports = router;
