/*** 사용자 모델 클래스 ***/
class User {
  constructor(data) {
    this.id = data.id;
    this.email = data.email;
    this.username = data.username;
    this.password = data.password;
    this.isActive = data.is_active;
    this.createdAt = data.created_at;
    this.updatedAt = data.updated_at;
  }

  /** 민감한 정보를 제외한 사용자 정보 반환 **/
  publicToJson() {
    return {
      id: this.id,
      email: this.email,
      username: this.username,
      isActive: this.isActive,
      createdAt: this.createdAt
    };
  }

  /** 사용자 정보 전체 반환 **/
  allToJson() {
    return {
      id: this.id,
      email: this.email,
      username: this.username,
      password: this.password,
      isActive: this.isActive,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    };
  }

  /** 사용자가 활성 상태인지 확인 **/
  isActiveUser() {
    return this.isActive === true;
  }

  /** 사용자 정보가 완전한지 확인 **/
  isProfileComplete() {
    return Boolean(this.email && this.username);
  }
}

module.exports = User;
