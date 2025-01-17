const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');

/** 사용자 라우트 **/
router.post('/', UserController.createUser);
router.get('/', UserController.readUsers);
router.patch('/', UserController.updateUser);
router.delete('/', UserController.deleteUser);

router.get('/excel', UserController.excelUser);

module.exports = router; 