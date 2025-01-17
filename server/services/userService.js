const bcrypt = require('bcrypt');
const User = require('../models/User');
const UserRepository = require('../repositories/UserRepository');
const { USER_MESSAGES } = require('../utils/Messages');

/** 사용자 서비스 **/
class UserService {

  /** 사용자 생성 메서드 **/
  async createUserService(userData) {
    try {
      const { email, password } = userData;
      
      const existingUser = await UserRepository.readUsers({ email });
      if (existingUser && existingUser.length > 0) {
        return {
          success: false,
          message: USER_MESSAGES.CREATE.EMAIL_EXISTS
        };
      }

      const saltRounds = 10;
      userData.password = await bcrypt.hash(password, saltRounds);

      const queryResult = await UserRepository.createUser(userData);

      return {
        success: true,
        message: USER_MESSAGES.CREATE.SUCCESS,
        rowCount: queryResult.affectedRows
      };
      
    } catch (error) {
      return {
        success: false,
        message: USER_MESSAGES.ERROR.CREATE_FAILED
      };
    }
  }

  /** 사용자 조회 메서드 **/
  async readUsersService(readParams) {
    try {      
      const users = await UserRepository.readUsers(readParams);
      console.log("UserService > readUsersService : ", users);

      return {
        success: true,
        message: users.length > 0 
          ? USER_MESSAGES.READ.SUCCESS 
          : USER_MESSAGES.READ.EMPTY_RESULT,
        data: users.map(user => new User(user).publicToJson()),
      };
      
    } catch (error) {
      return {
        success: false,
        message: USER_MESSAGES.ERROR.READ_FAILED
      };
    }
  }

  /** 사용자 수정 메서드 **/
  async updateUserService(userId, updateParams) {
    try {
      const existingUser = await UserRepository.readUsers({ id: userId });
      if (!existingUser || existingUser.length === 0) {
        return {
          success: false,
          message: USER_MESSAGES.UPDATE.NOT_FOUND
        };
      }

      const isPasswordValid = await bcrypt.compare(
        updateParams.password,
        existingUser[0].password
      );

      if (!isPasswordValid) {
        return {
          success: false,
          message: USER_MESSAGES.UPDATE.PASSWORD_MISMATCH
        };
      }

      const saltRounds = 10;
      updateParams.password = await bcrypt.hash(updateParams.new_password, saltRounds);
      delete updateParams.new_password;
      
      const queryResult = await UserRepository.updateUser(userId, updateParams);
      return {
        success: true,
        message: USER_MESSAGES.UPDATE.SUCCESS,
        rowCount: queryResult.affectedRows
      };
  
    } catch (error) {
      return {
        success: false,
        message: USER_MESSAGES.ERROR.UPDATE_FAILED
      };
    }
  }

  async deleteUserService(userId) {
    try {
      const existingUser = await UserRepository.readUsers({ id: userId });
      if (!existingUser || existingUser.length === 0) {
        return {
          success: false,
          message: USER_MESSAGES.DELETE.NOT_FOUND
        };
      }
      
      const queryResult = await UserRepository.deleteUser(userId);
      return {
        success: true,
        message: USER_MESSAGES.DELETE.SUCCESS,
        rowCount: queryResult.affectedRows
      };
  
    } catch (error) {
      return {
        success: false,
        message: USER_MESSAGES.ERROR.DELETE_FAILED
      };
    }
  }

}

module.exports = new UserService(); 