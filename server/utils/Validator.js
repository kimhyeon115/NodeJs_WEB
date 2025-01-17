class Validator {

    /**
     * 숫자인지 확인하는 유틸리티 메서드
     * @param {any} value - 확인할 값
     * @returns {boolean} - 유효한 숫자인 경우 true, 그렇지 않으면 false
     */
    static isValidNumber(value) {
      const parsed = parseInt(value, 10);
      return !isNaN(parsed) && parsed >= 0;
    }

    static isValidEmail(value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(value);
    }

  }

 module.exports = Validator;