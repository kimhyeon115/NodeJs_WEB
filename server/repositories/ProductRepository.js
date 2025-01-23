const db = require('../config/database');
const ProductQueryBuilder = require('../queries/ProductQueryBuilder');

/*** 상품 리포지토리 ***/
class ProductRepository {

  /** 상품 조회 메서드 **/
  async readProducts(readParams) {
    const { query, params } = ProductQueryBuilder.readProductsQuery(readParams);
    const [rows] = await db.execute(query, params);
    return rows;
  }

  /** 상품 생성 메서드 **/
  async createProduct(productData) {
    const { query, params } = ProductQueryBuilder.createProductQuery(productData);
    const [result] = await db.execute(query, params);
    return result;
  }

  /** 상품 수정 메서드 **/
  async updateProduct(id, updateParams) {
    const { query, params } = ProductQueryBuilder.updateProductQuery(id, updateParams);
    const [result] = await db.execute(query, params);
    return result;
  }

  /** 상품 삭제 메서드 **/
  async deleteProduct(id) {
    const { query, params } = ProductQueryBuilder.deleteProductQuery(id);
    const [result] = await db.execute(query, params);
    return result;
  }
} 

module.exports = new ProductRepository();
