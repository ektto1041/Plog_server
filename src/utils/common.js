/**
 * 입력값 유효성 검사 함수
 * @param {* 유효성 검사를 하려는 필드 배열} params
 * @returns { key: 입력하지 않은 필드값, result: boolean }
 */
const validate = (params) => {
  for (key in params) {
    const param = params[key];
    if (param === "" || param === null || param === undefined) {
      return { key, result: false };
    }
  }
  return { result: true };
};

module.exports = {
  validate,
};
