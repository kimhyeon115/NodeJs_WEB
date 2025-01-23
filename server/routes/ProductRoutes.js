const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/productController');
// const upload = require('../middlewares/uploadMiddleware');


// router.post('/', upload.single('image'), ProductController.createProduct);
// router.get('/:id', ProductController.getProductById);
// router.patch('/:id', upload.single('image'), ProductController.updateProduct);
// router.delete('/:id', ProductController.deleteProduct);

/** 상품 라우트 **/
router.post('/', ProductController.createProduct);
router.get('/', ProductController.readProducts);
router.patch('/', ProductController.updateProduct);
router.delete('/', ProductController.deleteProduct);

module.exports = router;
