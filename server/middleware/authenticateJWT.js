const jwt = require('jsonwebtoken');
const ApiResponse = require('../utils/Response');
const { USER_MESSAGES } = require('../utils/Messages');


/** 미들웨어: JWT 검증 **/
function authenticateJWT(req, res, next) {

  /* "Bearer token" 형식에서 token 추출 */
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) {
    return res.json(ApiResponse.error(USER_MESSAGES.ERROR.MISSING_TOKEN, 403));
  }

  jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
    if (err) {
      return res.json(ApiResponse.error(USER_MESSAGES.ERROR.INVALID_TOKEN));
    }

    /* 토큰에 포함된 사용자 정보를 첨부 */
    req.user = user;
    console.log('authenticateJWT', user);

    /* 인증 성공 시 다음 미들웨어나 라우트로 넘김 */
    next();
  });
}

module.exports = { authenticateJWT };