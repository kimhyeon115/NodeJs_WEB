const ApiResponse = require('../utils/Response');
const { PRODUCT_MESSAGES } = require('../utils/Messages');
const ProductService = require('../services/productService');

/** 상품 컨트롤러 **/
class ProductController {

  /** 상품 생성 메서드 **/
  static async createProduct(req, res) {
    try {
      const { name, description, price, sku } = req.body;
      if (!name || !description || !price || !sku) {
        return res.json(ApiResponse.error(PRODUCT_MESSAGES.CREATE.REQUIRED_FIELD_MISSING));
      }
      console.log("ProductController > createProduct : ", req.body);

      const result = await ProductService.createProductService(req.body);
      if (!result.success) {
        return res.json(ApiResponse.error(result.message));
      }

      return res.json(ApiResponse.success(result.message, result.rowCount));

    } catch (error) {
      return res.json(
        ApiResponse.error(PRODUCT_MESSAGES.ERROR.SERVER_ERROR, 500)
      );
    }
  }
  
  /** 상품 조회 메서드 **/
  static async readProducts(req, res) {
    try {
      const { id, name, category, sku, is_active } = req.query;
      const readParams = {
        ...(id && { id }),
        ...(name && { name }),
        ...(category && { category }),
        ...(sku && { sku }),
        ...(is_active && { is_active })
      };
      console.log("ProductController > readProducts : ", readParams);

      const result = await ProductService.readProductsService(readParams);
      if (!result.success) {
        return res.json(ApiResponse.error(result.message));
      }

      return res.json(ApiResponse.getSuccess(result.message, result.data));

    } catch (error) {
      return res.json(ApiResponse.error(PRODUCT_MESSAGES.ERROR.SERVER_ERROR, 500));
    }
  }

  /** 상품 수정 메서드 **/
  static async updateProduct(req, res) {
    try {
      const productId = req.body.id;

      if (!productId) {
        return res.json(ApiResponse.error(PRODUCT_MESSAGES.ERROR.REQUIRED_FIELD_MISSING));
      }
      if (!req.body.data) {
        return res.json(ApiResponse.error(PRODUCT_MESSAGES.ERROR.INVALID_FORMAT));
      }
      console.log("ProductController > updateProduct : ", req.body);

      const result = await ProductService.updateProductService(productId, req.body.data);
      if (!result.success) {
        return res.json(ApiResponse.error(result.message));
      }

      return res.json(ApiResponse.success(result.message, result.rowCount));

    } catch (error) {
      return res.json(ApiResponse.error(PRODUCT_MESSAGES.ERROR.SERVER_ERROR, 500));
    }
  }

  /** 상품 삭제 메서드 **/
  static async deleteProduct(req, res) {
    try { 
      const productId = req.body.id;

      if (!productId) {
        return res.json(ApiResponse.error(PRODUCT_MESSAGES.DELETE.REQUIRED_FIELD_MISSING));
      }
      console.log("ProductController > deleteProduct : ", productId);

      const result = await ProductService.deleteProductService(productId);

      if (!result.success) {
        return res.json(ApiResponse.error(result.message));
      }

      return res.json(ApiResponse.success(result.message, result.rowCount));

    } catch (error) {
      return res.json(ApiResponse.error(PRODUCT_MESSAGES.ERROR.SERVER_ERROR, 500));
    }
  }
} 

module.exports = ProductController;