const mysql = require('mysql2/promise');
require('dotenv').config();


/** 쿼리 로깅을 위한 커스텀 로거 **/
const queryLogger = (query, params) => {
  console.log('---------------------------------------------------------------------------------');
  console.log('\n[SQL Query]:', query);
  if (params) console.log('[Parameters]:', params);
  console.log('---------------------------------------------------------------------------------');
};

/** 기존 풀 설정 유지 **/
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

/** DB 연결 테스트 **/
const testConnection = async () => {
  try {
    const connection = await pool.getConnection();
    console.log('Database connection successful');
    connection.release();
  } catch (error) {
    console.error('Database connection failed:', error);
  }
};

/** 쿼리 실행 래퍼 함수 **/
const execute = async (query, params) => {
  try {
    /* 쿼리 로깅 */
    queryLogger(query, params);
    
    /* 쿼리 실행 */
    const [rows] = await pool.execute(query, params);
    
    /* 결과 로깅 */
    if (rows.affectedRows !== undefined) {
      console.log('[Query Result]', {
        affectedRows: rows.affectedRows,
        changedRows: rows.changedRows,
        insertId: rows.insertId
      });
      console.log('---------------------------------------------------------------------------------');
    }
    
    return [rows];
  } catch (error) {
    console.error('[Query Error]:', error);
    throw error;
  }
};

testConnection();

module.exports = {
  pool,
  execute
};
