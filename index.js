const express = require("express");
const morgan = require("morgan");
const passport = require("passport");
const bcrypt = require("bcrypt");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const { sequelize } = require("./models");
const passportConfig = require("./src/passport");

const router = require("./src/router");
const authRoutes = require("./src/routes/auth");

const Menu = require("./models/menu");
const User = require("./models/user");

const app = express();
const port = 4000;
passportConfig();

/**
 * *************
 * 기타
 * *************
 */
// 서버에 전역 변수 설정
// app.set('variable', 'value');
// console.log(app.get('variable'));

/**
 * ***************
 * DB 연결
 * > force: true로 설정하면, 서버 실행시 마다 기존 테이블을 삭제하고 새로운 테이블 생성
 * ***************
 */
sequelize
  .sync({ force: true })
  .then(async () => {
    // DB 연결 후 수행 동작 정의
    console.log("[DB 연결 성공]");
    const password = "admin";
    const hash = await bcrypt.hash(password, 12);

    // 더미 데이터 추가
    await User.bulkCreate([
      {
        name: "박용우",
        email: "apfhd5620@gmail.com",
        password: hash,
      },
      {
        name: "박상연",
        email: "ektto1041@gmail.com",
        password: hash,
      },
    ]);

    await Menu.bulkCreate([
      {
        name: "프로그래밍",
        sort: "1",
      },
      {
        name: "About Us",
        sort: 2,
      },
    ]);

    // 더미 데이터 조회
    const [users] = await sequelize.query("SELECT * FROM users");
    const menus = await Menu.findAll();
    console.log("[더미 데이터 조회 (User)]:", users);
    console.log("[더미 데이터 조회 (Menu)]:", menus);
  })
  .catch((err) => {
    console.log("[DB 연결 실패]:", err);
  });

/**
 * ************************
 * 미들웨어 선언
 * ************************
 */
app.use(express.json()); // req.body 객체에 사용자로부터 온 요청의 body를 넣어줌
app.use(express.urlencoded({ extended: true })); // form 파싱
app.use(morgan("dev")); // 운영: combined
app.use(cookieParser());
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: "plog_secret",
  })
); // req 객체에 session 주입
app.use(passport.initialize()); // req 객체에 passport 데이터 주입
app.use(passport.session());

/**
 * ************************
 * 라우터 설정
 * ************************
 */
app.use("/auth", authRoutes);
app.use("/", router); // 라우터

// 404 에러 처리 미들웨어 (에러 미들웨어보다 위에 있어야함)
app.use((req, res, next) => {
  const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
  error.status = 404;
  next(error);
});

// 에러 미들웨어
app.use((err, req, res, next) => {
  res.status(err.status || 500).render("error");
});

// server start
app.listen(port, () => {
  console.log("listen");
});
