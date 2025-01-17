import { Container, ListGroup, Button, Row, Col } from "react-bootstrap";
import { useState, useEffect } from "react";
import axios from "axios";

function ProductManagePage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products")
      .then((response) => setProducts(response.data))
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  return (
    <Container className="mt-4">
      <Row className="mb-4">
        <Col>
          <h2>상품 관리</h2>
        </Col>
        <Col className="text-end">
          <Button variant="primary">새 상품 추가</Button>
        </Col>
      </Row>
      <ListGroup>
        {products.map((product) => (
          <ListGroup.Item
            key={product.id}
            className="d-flex justify-content-between align-items-center"
          >
            <div>
              <h5>{product.title}</h5>
              <p className="mb-0">가격: ${product.price}</p>
            </div>
            <div>
              <Button variant="warning" size="sm" className="me-2">
                수정
              </Button>
              <Button variant="danger" size="sm">
                삭제
              </Button>
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Container>
  );
}

export default ProductManagePage;
