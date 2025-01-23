const ApiResponse = require('../utils/Response');
const { USER_MESSAGES } = require('../utils/Messages');
const UserService = require('../services/UserService');
const Validator = require('../utils/Validator');
const ExcelJS = require('exceljs');
const jwt = require('jsonwebtoken');


/*** 사용자 컨트롤러 ***/
class UserController {
  
  /** 사용자 생성 메서드 **/
  static async createUser(req, res) {
    try {

      /* 필수 컬럼 유효성 검증 */
      const { email, password, username } = req.body;      
      if (!email || !password || !username) {
        return res.json(ApiResponse.error(USER_MESSAGES.ERROR.REQUIRED_FIELD_MISSING));
      }
      console.log("UserController > createUser : ", req.body);


      /* 비지니스 로직 결과 */
      const result = await UserService.createUserService({ email, password, username });
      if (!result.success) {
        return res.json(ApiResponse.error(result.message));
      }

      /* 최종 응답 */
      return res.json(ApiResponse.success(result.message, result.rowCount));

    } catch (error) {
      return res.json(ApiResponse.error(USER_MESSAGES.ERROR.SERVER_ERROR, 500));
    }
  }


  /** 사용자 조회 메서드 **/
  static async readUsers(req, res) {
    try {

      /* 쿼리 파라미터에서 조회 필터 값 추출 */
      const { id, email, username, is_active, page, limit } = req.query;
      const readParams = {
        ...(id && { id }),
        ...(email && { email }),
        ...(username && { username }),
        ...(is_active && { is_active }),
        ...(Validator.isValidNumber(page) && { page: parseInt(page, 10) }),
        ...(Validator.isValidNumber(limit) && { limit: parseInt(limit, 10) })
      };
      console.log("UserController > readUsers : ", readParams);

      /* 비지니스 로직 결과 */
      const result = await UserService.readUsersService(readParams);
      if (!result.success) {
        return res.json(ApiResponse.error(result.message));
      }

      /* 최종 응답 */
      return res.json(ApiResponse.getSuccess(result.message, result.data));

    } catch (error) {
      return res.json(ApiResponse.error(USER_MESSAGES.ERROR.SERVER_ERROR, 500));
    }
  }


  /** 사용자 수정 메서드 **/
  static async updateUser(req, res) {
    try {
      const user_id = req.body.id;

      if (!req.body.data) {
        return res.json(ApiResponse.error(USER_MESSAGES.ERROR.INVALID_FORMAT));
      }
      const { username, password, new_password, is_active, is_verified } = req.body.data;

      if (!user_id || !username || !password || !new_password) {
        return res.json(ApiResponse.error(USER_MESSAGES.ERROR.REQUIRED_FIELD_MISSING));
      }

      const updateParams = {
        ...(username && { username }),
        ...(password && { password }),
        ...(new_password && { new_password }),
        ...(typeof is_active !== 'undefined' && { is_active }),
        ...(typeof is_verified !== 'undefined' && { is_verified })
      };
      console.log("UserController > updateUser : ", user_id, ' : ', updateParams);
      
      const result = await UserService.updateUserService(user_id, updateParams);

      if (!result.success) {
        return res.json(ApiResponse.error(result.message));
      }

    return res.json(ApiResponse.success(result.message, result.rowCount));

    } catch (error) {
      return res.json(ApiResponse.error(USER_MESSAGES.ERROR.SERVER_ERROR, 500));
    }
  }


  /** 사용자 삭제 메서드 **/
  static async deleteUser(req, res) {
    try {
      const user_id = req.body.id;

      if (!user_id) {
        return res.json(ApiResponse.error(USER_MESSAGES.ERROR.REQUIRED_FIELD_MISSING));
      }
      console.log("UserController > deleteUser : ", user_id);
      
      const result = await UserService.deleteUserService(user_id);

      if (!result.success) {
        return res.json(ApiResponse.error(result.message));
      }

    return res.json(ApiResponse.success(result.message, result.rowCount));

    } catch (error) {
      return res.json(ApiResponse.error(USER_MESSAGES.ERROR.SERVER_ERROR, 500));
    }
  }


  /** 사용자 엑셀 파일 생성 메서드 */
  static async excelUser(req, res) {

    /* 쿼리 파라미터에서 조회 필터 값 추출 */
    const { id, email, username, is_active, page, limit } = req.query;
    const readParams = {
      ...(id && { id }),
      ...(email && { email }),
      ...(username && { username }),
      ...(is_active && { is_active }),
      ...(Validator.isValidNumber(page) && { page: parseInt(page, 10) }),
      ...(Validator.isValidNumber(limit) && { limit: parseInt(limit, 10) })
    };
    console.log("UserController > excelUser : ", readParams);

    /* 비지니스 로직 결과 */
    const result = await UserService.readUsersService(readParams);
    if (!result.success) {
      return res.json(ApiResponse.error(result.message));
    }

    /* 워크북 및 워크시트 생성 */
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Users');

    /* 워크시트 컬럼 정의 */
    worksheet.columns = [
      { header: 'ID', key: 'id', width: 10 },
      { header: 'Email', key: 'email', width: 30 },
      { header: 'Username', key: 'username', width: 20 },
      { header: 'Is Active', key: 'is_active', width: 10 },
      { header: 'Is Verified', key: 'is_verified', width: 10 },
      { header: 'Created', key: 'created_at', width: 20 },
      { header: 'Updated', key: 'updated_at', width: 20 }
    ];

    /* 워크시트에 데이터 추가 */
    result.data.forEach((user) => {
      worksheet.addRow(user);
    });

    /* 파일 응답 */
    res.setHeader('Content-Disposition', 'attachment; filename="filtered_users.xlsx"');
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');

    /* 파일 스트림 전송 */
    await workbook.xlsx.write(res);
    res.end();
  }


  /** 사용자 로그인 메서드 **/
  static async loginUser(req, res) {
    try {

      /* 필수 컬럼 유효성 검증 */
      const { email, password } = req.body;      
      if (!email || !password) {
        return res.json(ApiResponse.error(USER_MESSAGES.ERROR.REQUIRED_FIELD_MISSING));
      }
      console.log("UserController > loginUser : ", req.body);

      /* 비지니스 로직 결과 */
      const result = await UserService.loginUserService({ email, password });
      if (!result.success) {
        return res.json(ApiResponse.error(result.message));
      }
      const user = result.data[0];
      
      /* JWT 토큰 생성 */
      const token = jwt.sign(
        { id: user.id, email: user.email, username: user.username },
        process.env.SECRET_KEY,
        { expiresIn: '1h' }
      );

      /* 최종 응답 */
      return res.json(ApiResponse.loginSuccess(result.message, token, result.data));

    } catch (error) {
      return res.json(ApiResponse.error(USER_MESSAGES.ERROR.SERVER_ERROR, 500));
    }
  }


  /** 사용자 로그아웃 메서드 **/
  static async logoutUser(req, res) {
    /* 현재는 프론트에서 처리 */
  }

  /** JWT 토큰으로 사용자 조회 **/
  static async findCurrentUser(req, res) {
    try {

      /* Authorization 헤더에서 토큰 추출 */
      /* "Bearer token" 형식에서 token만 추출 */
      const token = req.headers['authorization']?.split(' ')[1];

      if (!token) {
        return res.json(ApiResponse.error(USER_MESSAGES.ERROR.MISSING_TOKEN));
      }
      console.log("UserController > findCurrentUser > token : ", token);

      /* JWT 토큰 검증 */
      jwt.verify(token, process.env.SECRET_KEY, async (err, decoded) => {
        if (err) {
          console.log('JWT 검증 실패', err);
          /* 토큰이 유효하지 않거나 만료된 경우 */
          return res.json(ApiResponse.error(USER_MESSAGES.ERROR.INVALID_TOKEN));
        }

        /* 토큰이 유효한 경우, decoded에는 사용자의 정보가 포함됨 */
        const { id } = decoded;

        /* decoded내의 정보에서 ID로 사용자 정보 조회 */
        const result = await UserService.readUsersService({id});

        if (result.length === 0) {
          return res.json(ApiResponse.error(USER_MESSAGES.ERROR.READ_FAILED));
        }
        console.log("UserController > findCurrentUser : ", result);        
        // const user = result.data[0];

        /* JWT 토큰 생성 */
        // const newToken = jwt.sign(
        //   { id: user.id, email: user.email, username: user.username },
        //   process.env.SECRET_KEY,
        //   { expiresIn: '10s' }
        // );

        /* 신규 토큰 디코딩 */
        // const decodedToken = jwt.decode(newToken);
        // console.log("Decoded Token Expiry:", decodedToken);

        /* 최종 응답 */
        // return res.json(ApiResponse.loginSuccess(result.message, newToken, result.data));
        return res.json(ApiResponse.getSuccess(result.message, result.data));
      });
    } catch (error) {
      return res.json(ApiResponse.error(USER_MESSAGES.ERROR.SERVER_ERROR, 500));
    }
  }
}

module.exports = UserController;
