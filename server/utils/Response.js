/*** API 응답 클래스 ***/
class ApiResponse {

  /** 성공 응답 생성 메서드 **/
  static success(message, rowCount, statusCode = 200) {
    return {
      status: statusCode,
      success: true,
      message,
      rowCount,
    };
  }

  /** 실패 응답 생성 메서드 **/
  static error(message, statusCode = 400) {
    return {
      status: statusCode,
      success: false,
      message
    };
  }

  /** GET 성공 응답 생성 메서드 **/
  static getSuccess(message, rows = [], statusCode = 200) {
    const totalCount = Array.isArray(rows) ? rows.length : (rows ? 1 : 0);
    
    return {
      status: statusCode,
      success: true,
      message,
      totalCount,
      body: rows
    };
  }

  /** 로그인 성공 응답 생성 메서드 **/
  static loginSuccess(message, token, row = [], statusCode = 200) {
    
    return {
      status: statusCode,
      success: true,
      message,
      body: row,
      token
    };
  }
}

module.exports = ApiResponse;
