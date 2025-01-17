/** 사용자 쿼리 빌더 클래스 **/
class UserQueryBuilder {
  
  /** 사용자 생성 쿼리 생성 메서드 **/
  static createUserQuery(userData) {
    const query = `
      INSERT INTO users (email, password, username) 
      VALUES (?, ?, ?)
    `;
    
    const params = [userData.email, userData.password, userData.username];
    return { query, params };
  }


  /** 사용자 조회 쿼리 생성 메서드 **/
  static readUsersQuery(readParams) {
    const { id, email, username, is_active, page, limit } = readParams;

    // WHERE 조건 배열 및 파라미터 배열 초기화
    const whereClauses = [];
    const queryParams = [];

    // 조건 추가 함수: 가독성을 위해 추출
    const addCondition = (condition, param) => {
      whereClauses.push(condition);
      queryParams.push(param);
    };

    // 조건 처리
    if (id) addCondition('id = ?', id);
    if (email) addCondition('email = ?', email);
    if (username) addCondition('username LIKE ?', `%${username}%`);
    if (typeof is_active !== 'undefined') {
      const isActiveValue = is_active === 'true' || is_active === '1' ? 1 : 0;
      addCondition('is_active = ?', isActiveValue);
    }

    // LIMIT 및 OFFSET 처리
    const offset = page && limit ? (parseInt(page, 10) - 1) * parseInt(limit, 10) : 0;
    const limitClause = limit ? `LIMIT ${parseInt(limit, 10)}` : '';
    const offsetClause = page && limit ? `OFFSET ${offset}` : '';

    // 최종 쿼리 생성
    const query = `
      SELECT * 
      FROM users
      ${whereClauses.length > 0 ? 'WHERE ' + whereClauses.join(' AND ') : ''}
      ORDER BY created_at DESC
      ${limitClause} ${offsetClause}
    `.trim();

    // 결과 반환
    return { query, params: queryParams };
  }


  /** 사용자 수정 쿼리 생성 메서드 **/
  static updateUserQuery(id, updateParams) {
    const sets = [];
    const params = [];

    Object.entries(updateParams).forEach(([key, value]) => {
      if (value !== undefined) {
        sets.push(`${key} = ?`);
        params.push(value);
      }
    });

    params.push(id);

    const query = `
      UPDATE users 
      SET ${sets.join(', ')}
      WHERE id = ?
    `;

    return { query, params };
  }
  

  /** 사용자 삭제 쿼리 생성 메서드 **/
  static deleteUserQuery(id) {
    const query = `
      UPDATE users SET is_active = false WHERE id = ?
    `;
    
    const params = [id];
    return { query, params };
  }

} 

module.exports = UserQueryBuilder;