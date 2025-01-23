const Product = require('../models/Product');
const ProductRepository = require('../repositories/ProductRepository');
const { PRODUCT_MESSAGES } = require('../utils/Messages');


/*** 상품 서비스 ***/
class ProductService {

  /** 상품 조회 메서드 **/
  async readProductsService(params) {
    try {
      const products = await ProductRepository.readProducts(params);
      console.log("ProductService > readProductsService : ", products);
      
      return {
        success: true,
        message: products.length > 0 
          ? PRODUCT_MESSAGES.READ.SUCCESS 
          : PRODUCT_MESSAGES.READ.EMPTY_RESULT,
        data: products.map(product => new Product(product).allToJson()),
      };

    } catch (error) {
      return {
        success: false,
        message: PRODUCT_MESSAGES.ERROR.READ_FAILED
      };
    }
  }

  /** 상품 생성 메서드 **/
  async createProductService(productData) {
    try {
      const { price, sku } = productData;

      if (!Number(price) || Number(price) <= 0) {
        return {
          success: false,
          message: PRODUCT_MESSAGES.CREATE.INVALID_PRICE
        };
      }

      const existingProduct = await ProductRepository.readProducts({ sku });
      if (existingProduct && existingProduct.length > 0) {
        return {
          success: false,
          message: PRODUCT_MESSAGES.CREATE.SKU_EXISTS
        };
      }

      const queryResult = await ProductRepository.createProduct(productData);
      
      return {
        success: true,
        message: PRODUCT_MESSAGES.CREATE.SUCCESS,
        rowCount: queryResult.affectedRows
      };

    } catch (error) {
      return {
        success: false,
        message: PRODUCT_MESSAGES.ERROR.CREATE_FAILED
      };
    }
  }

  /** 상품 수정 메서드 **/
  async updateProductService(productId, updateParams) {
    try {
      const existingProduct = await ProductRepository.readProducts({ id: productId });
      if (!existingProduct || existingProduct.length === 0) {
        return {
          success: false,
          message: PRODUCT_MESSAGES.UPDATE.NOT_FOUND
        };
      }

      const queryResult = await ProductRepository.updateProduct(productId, updateParams);
      return {
        success: true,
        message: PRODUCT_MESSAGES.UPDATE.SUCCESS,
        rowCount: queryResult.affectedRows
      };

    } catch (error) {
      return {
        success: false,
        message: PRODUCT_MESSAGES.ERROR.UPDATE_FAILED
      };
    }
  }

  /** 상품 삭제 메서드 **/
  async deleteProductService(productId) {
    try {
      const existingProduct = await ProductRepository.readProducts({ id: productId });
      if (!existingProduct || existingProduct.length === 0) {
        return {
          success: false,
          message: PRODUCT_MESSAGES.DELETE.NOT_FOUND
        };
      }

      const queryResult = await ProductRepository.deleteProduct(productId);
      return {
        success: true,
        message: PRODUCT_MESSAGES.DELETE.SUCCESS,
        rowCount: queryResult.affectedRows
      };

    } catch (error) {
      return {
        success: false,
        message: PRODUCT_MESSAGES.ERROR.DELETE_FAILED
      };
    }
  }
} 

module.exports = new ProductService();
