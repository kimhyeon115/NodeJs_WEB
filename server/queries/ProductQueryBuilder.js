/** 상품 쿼리 빌더 클래스 **/
class ProductQueryBuilder {
  
  /** 상품 생성 쿼리 생성 메서드 **/
  static createProductQuery(productData) {
    const fields = [];
    const values = [];
    const params = [];

    Object.entries(productData).forEach(([key, value]) => {
      if (value !== undefined) {
        fields.push(key);
        values.push('?');
        params.push(value);
      }
    });

    const query = `
      INSERT INTO products (
        ${fields.join(', ')}
      ) VALUES (
        ${values.join(', ')}
      )
    `;

    return { query, params };
  }

  /** 상품 조회 쿼리 생성 메서드 **/
  static readProductsQuery(readParams) {
    const { id, name, category, sku, is_active} = readParams;

    const where = [];
    const params = [];

    if (id) {
      where.push('p.id = ?');
      params.push(id);
    }
    if (name) {
      where.push('name LIKE ?');
      params.push(`%${name}%`);
    }
    if (category) {
      where.push('p.category = ?');
      params.push(category);
    }
    if (sku) {
      where.push('p.sku = ?');
      params.push(sku);
    }
    if (typeof is_active !== 'undefined') {
      where.push('is_active = ?');
      params.push(is_active === 'true' || is_active === '1' ? 1 : 0);
    }

    const query = `
      SELECT 
        p.*,
        COALESCE(pi.quantity, 0) as quantity
      FROM products p
      LEFT JOIN product_inventory pi ON p.id = pi.product_id
      ${where.length > 0 ? 'WHERE ' + where.join(' AND ') : ''}
      ORDER BY p.display_order ASC, p.created_at DESC
    `;

    return { query, params };
  }

  /** 상품 수정 쿼리 생성 메서드 **/
  static updateProductQuery(id, updateParams) {
    const sets = [];
    const params = [];

    Object.entries(updateParams).forEach(([key, value]) => {
      if (value !== undefined) {
        sets.push(`${key} = ?`);
        params.push(value);
      }
    });

    params.push(id);

    const query = `
      UPDATE products 
      SET ${sets.join(', ')}
      WHERE id = ?
    `;

    return { query, params };
  }

  /** 상품 삭제 쿼리 생성 메서드 **/
  static deleteProductQuery(id) {
    const query = `
      UPDATE products SET is_active = false WHERE id = ?
    `;
    
    const params = [id];
    return { query, params };
  }
  
} 

module.exports = ProductQueryBuilder;