/** 상품 모델 클래스 **/
class Product {
  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.description = data.description;
    this.price = data.price;
    this.category = data.category;
    this.sku = data.sku;
    this.is_active = data.is_active;
    this.image_url = data.image_url;
    this.display_order = data.display_order;
    this.quantity = data.quantity;  // JOIN 결과에서 가져올 재고 수량
    this.created_at = data.created_at;
    this.updated_at = data.updated_at;
  }

  // 민감한 정보를 제외한 상품 정보 반환
  publicToJson() {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      price: this.price,
      category: this.category,
      sku: this.sku,
      isActive: this.is_active,
      imageUrl: this.image_url,
      displayOrder: this.display_order,
      quantity: this.quantity,
    };
  }

  // 상품 정보를 JSON 형식으로 반환
  allToJson() {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      price: this.price,
      category: this.category,
      sku: this.sku,
      isActive: this.is_active,
      imageUrl: this.image_url,
      displayOrder: this.display_order,
      quantity: this.quantity,
      createdAt: this.created_at,
      updatedAt: this.updated_at
    };
  }
}

module.exports = Product; 