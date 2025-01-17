/** 사용자 관련 메시지 **/
const USER_MESSAGES = {

  /** 저장 관련 메시지 **/
  CREATE: {
    SUCCESS: "사용자가 성공적으로 생성되었습니다.",
    EMAIL_EXISTS: "이미 존재하는 이메일입니다."
  },

  /** 조회 관련 메시지 **/
  READ: {
    SUCCESS: "사용자 조회에 성공했습니다.",
    EMPTY_RESULT: "조회된 사용자가 없습니다.",
    NOT_FOUND: "사용자를 찾을 수 없습니다."
  },

  /** 수정 관련 메시지 **/
  UPDATE: {
    SUCCESS: "사용자 정보가 성공적으로 수정되었습니다.",
    NOT_FOUND: "수정할 사용자를 찾을 수 없습니다.",
    PASSWORD_MISMATCH: "현재 비밀번호가 일치하지 않습니다."
  },

  /** 삭제 관련 메시지 **/
  DELETE: {
    SUCCESS: "사용자 정보가 성공적으로 삭제되었습니다.",
    NOT_FOUND: "삭제할 사용자가 없습니다.",
  },

  /** 오류 관련 메시지 **/
  ERROR: {
    REQUIRED_FIELD_MISSING: "필수 입력값이 누락되었습니다.",
    INVALID_FORMAT: "유효하지 않은 입력입니다.",
    CREATE_FAILED: "제품 생성에 실패했습니다.",
    READ_FAILED: "제품 조회에 실패했습니다.",
    UPDATE_FAILED: "제품 수정에 실패했습니다.",
    DELETE_FAILED: "제품 삭제에 실패했습니다.",
    SERVER_ERROR: "서버 오류가 발생했습니다."
  }
};

/** 상품 관련 메시지 **/
const PRODUCT_MESSAGES = {

  /** 저장 관련 메시지 **/
  CREATE: {
    SUCCESS: "제품이 성공적으로 생성되었습니다.",
    INVALID_PRICE: "유효하지 않은 가격입니다.",
    SKU_EXISTS: "이미 존재하는 제품코드입니다."
  },

  /** 조회 관련 메시지 **/
  READ: {
    SUCCESS: "제품 조회에 성공했습니다.",
    EMPTY_RESULT: "조회된 제품이 없습니다.",
    NOT_FOUND: "제품을 찾을 수 없습니다."
  },

  /** 수정 관련 메시지 **/
  UPDATE: {
    SUCCESS: "제품이 성공적으로 수정되었습니다.",
    NOT_FOUND: "수정할 제품을 찾을 수 없습니다."
  },

  /** 삭제 관련 메시지 **/
  DELETE: {
    SUCCESS: "제품이 성공적으로 삭제되었습니다.",
    NOT_FOUND: "삭제할 제품이 없습니다."
  },

  /** 오류 관련 메시지 **/
  ERROR: {
    REQUIRED_FIELD_MISSING: "필수 입력값이 누락되었습니다.",
    INVALID_FORMAT: "유효하지 않은 입력입니다.",
    CREATE_FAILED: "제품 생성에 실패했습니다.",
    READ_FAILED: "제품 조회에 실패했습니다.",
    UPDATE_FAILED: "제품 수정에 실패했습니다.",
    DELETE_FAILED: "제품 삭제에 실패했습니다.",
    SERVER_ERROR: "서버 오류가 발생했습니다."
  }
};

module.exports = {
  USER_MESSAGES,
  PRODUCT_MESSAGES
}; 