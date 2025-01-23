const db = require('../config/database');
const UserQueryBuilder = require('../queries/UserQueryBuilder');


/*** 사용자 리포지토리 ***/
class UserRepository {

  /** 사용자 조회 메서드 **/
  async readUsers(readParams) {
    const { query, params } = UserQueryBuilder.readUsersQuery(readParams);
    const [rows] = await db.execute(query, params);    
    return rows;
  }

  /** 사용자 생성 메서드 **/
  async createUser(userData) {
    const { query, params } = UserQueryBuilder.createUserQuery(userData);
    const [result] = await db.execute(query, params);
    return result;
  }

  /** 사용자 수정 메서드 **/
  async updateUser(id, updateParams) {
    const { query, params } = UserQueryBuilder.updateUserQuery(id, updateParams);
    const [result] = await db.execute(query, params);
    return result;
  }

  /** 사용자 삭제 메서드 **/
  async deleteUser(id) {
    const { query, params } = UserQueryBuilder.deleteUserQuery(id);
    const [result] = await db.execute(query, params);
    return result;
  }
}

module.exports = new UserRepository();
