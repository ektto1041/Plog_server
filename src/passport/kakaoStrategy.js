const passport = require("passport");
const KakaoStrategy = require("passport-kakao").Strategy;

const User = require("../../models/user");

module.exports = () => {
  passport.use(
    new KakaoStrategy(
      {
        clientID: "b0f4345373406a8c736508308454e8a6",
        callbackURL: "/auth/kakao/callback",
      },
      async (accessToken, refreshToken, profile, done) => {
        console.log("kakao profile", profile);
        try {
          const exUser = await User.findOne({
            where: { snsId: profile.id, provider: "kakao" },
          });
          if (exUser) {
            done(null, exUser);
          } else {
            const newUser = await User.create({
              name: profile.displayName,
              email: "kakao_temp@kakao.com", // todo 카카오에서 이메일 얻기 (카카오싱크에 검수 요청 후 필수 사항으로 변경 가능)
              snsId: profile.id,
              provider: "kakao",
            });
            done(null, newUser);
          }
        } catch (error) {
          console.error(error);
          done(error);
        }
      }
    )
  );
};
