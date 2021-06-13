const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const User = require("../../models/user");

module.exports = () => {
  passport.use(
    new LocalStrategy(
      {
        usernameField: "email", // 해당 서비스에서 username 역할을 하는 필드명
        passwordField: "password", // 해당 서비스에서 password 역할을 하는 필드명
      },
      async (email, password, done) => {
        // done 함수가 실행되면 passport.authenticate 함수의 콜백 함수가 실행됨 (/routes/auth.js)
        try {
          const exUser = await User.findOne({ where: { email } });
          if (exUser) {
            const result = await bcrypt.compare(password, exUser.password);
            if (result) {
              done(null, exUser); // exUser는 어디로 가는가?
            } else {
              done(null, false, { message: "비밀번호가 일치하지 않습니다." });
            }
          } else {
            done(null, false, { message: "가입되지 않은 회원입니다." });
          }
        } catch (e) {
          console.log("Passport LocalStrategy Error:", e);
          done(e);
        }
      }
    )
  );
};
