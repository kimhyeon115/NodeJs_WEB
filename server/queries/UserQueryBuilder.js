/*** 사용자 쿼리 빌더 클래스 ***/
class UserQueryBuilder {
  
  /** 사용자 생성 쿼리 생성 메서드 **/
  static createUserQuery(userData) {
    const { email, password, username } = userData;

    /* 필드 배열 및 값 배열 초기화 */
    const fields = [];
    const placeholders = [];
    const queryParams = [];

    /* 필드 추가 함수: 가독성을 위해 추출 */
    const addField = (field, value) => {
      fields.push(field);
      placeholders.push('?');
      queryParams.push(value);
    };

    /* 필드 추가 */
    if (email) addField('email', email);
    if (password) addField('password', password);
    if (username) addField('username', username);

    /* 최종 쿼리 생성 */
    const query = `
      INSERT INTO users (${fields.join(', ')})
      VALUES (${placeholders.join(', ')})
    `.trim();

    /* 결과 반환 */
    return { query, params: queryParams };
  }

  /** 사용자 조회 쿼리 생성 메서드 **/
  static readUsersQuery(readParams) {
    const { id, email, username, is_active, page, limit } = readParams;

    /* WHERE 조건 배열 및 파라미터 배열 초기화 */
    const whereClauses = [];
    const queryParams = [];

    /* 조건 추가 함수: 가독성을 위해 추출 */
    const addCondition = (condition, param) => {
      whereClauses.push(condition);
      queryParams.push(param);
    };

    /* 조건 처리 */
    if (id) addCondition('id = ?', id);
    if (email) addCondition('email = ?', email);
    if (username) addCondition('username LIKE ?', `%${username}%`);
    if (typeof is_active !== 'undefined') {
      const isActiveValue = is_active === 'true' || is_active === '1' ? 1 : 0;
      addCondition('is_active = ?', isActiveValue);
    }

    /* LIMIT 및 OFFSET 처리 */
    const offset = page && limit ? (parseInt(page, 10) - 1) * parseInt(limit, 10) : 0;
    const limitClause = limit ? `LIMIT ${parseInt(limit, 10)}` : '';
    const offsetClause = page && limit ? `OFFSET ${offset}` : '';

    /* 최종 쿼리 생성 */
    const query = `
      SELECT * 
      FROM users
      ${whereClauses.length > 0 ? 'WHERE ' + whereClauses.join(' AND ') : ''}
      ORDER BY created_at DESC
      ${limitClause} ${offsetClause}
    `.trim();

    /* 결과 반환 */
    return { query, params: queryParams };
  }

  /** 사용자 수정 쿼리 생성 메서드 **/
  static updateUserQuery(id, updateParams) {

    /* SET 조건 배열 및 파라미터 배열 초기화 */
    const fields = [];
    const queryParams = [];

    /* 조건 추가 함수 */
    const addField = (field, value) => {
      fields.push(`${field} = ?`);
      queryParams.push(value);
    };

    /* 수정할 필드 처리 */
    Object.entries(updateParams).forEach(([key, value]) => {
      if (value !== undefined) {
        addField(key, value);
      }
    });

    /* id를 파라미터에 추가 */
    queryParams.push(id);

    /* 최종 쿼리 생성 */
    const query = `
      UPDATE users
      SET ${fields.join(', ')}
      WHERE id = ?
    `.trim();

    /* 결과 반환 */
    return { query, params: queryParams };
  }  

  /** 사용자 삭제 쿼리 생성 메서드 **/
  static deleteUserQuery(id) {
    
    /* `is_active` 값을 0(false)로 업데이트 */
    const query = `
      UPDATE users
      SET is_active = ?
      WHERE id = ?
    `.trim();

    /* 파라미터 설정 */
    const params = [0, id];   // `is_active`를 비활성화로 설정

    /* 결과 반환 */
    return { query, params };
  }

} 

module.exports = UserQueryBuilder;
