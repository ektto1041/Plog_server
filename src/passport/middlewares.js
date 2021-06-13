exports.isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res
      .status(403)
      .json({ status: "FAIL", message: "사용자 인증에 실패했습니다." });
  }
};

exports.isNotLoggedIn = (req, res, next) => {
  console.log("$$$ login", req.isAuthenticated());
  if (!req.isAuthenticated()) {
    next();
  } else {
    res.json({ status: "FAIL", message: "이미 로그인된 사용자입니다." });
  }
};
