const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');


/** 사용자 정보 **/
router.post('/', UserController.createUser);
router.get('/', UserController.readUsers);
router.patch('/', UserController.updateUser);
router.delete('/', UserController.deleteUser);

/* 사용자 정보 엑셀 */
router.get('/excel', UserController.excelUser);

/* 사용자 로그인, 로그아웃, 로그인 정보 */
router.get('/me', UserController.findCurrentUser)
router.post('/login', UserController.loginUser);
router.post('/logout', UserController.logoutUser);

module.exports = router;
