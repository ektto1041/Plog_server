const loginKakao = (req, res) => {
  console.log('$$$ kakao');
  res.send('hello');
}

const loginKakaoCallback = (req, res) => {
  console.log('$$$ callback');
}

module.exports = {
  loginKakao,
  loginKakaoCallback,
}