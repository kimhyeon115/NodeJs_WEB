import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import axios from "axios";


function ProductPage() {

  /* 상태 관리 */
  const [products, setProducts] = useState([]);       // 제품 정보 상태

  /* 제품 조회 요청 */
  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products")
      .then((response) => setProducts(response.data))
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  return (
    <Container className="mt-4">
      <h2>상품 목록</h2>
      <Row className="mt-3">
        {products.map((product) => (
          <Col key={product.id} sm={12} md={6} lg={4} className="mb-4">
            <Card>
              <Card.Img
                variant="top"
                src={product.image}
                style={{
                  height: "200px",
                  objectFit: "contain",
                  padding: "1rem",
                }}
              />
              <Card.Body>
                <Card.Title>{product.title}</Card.Title>
                <Card.Text>${product.price}</Card.Text>
                <Card.Text>
                  {product.description.substring(0, 100)}...
                </Card.Text>
                <Button variant="primary">장바구니에 담기</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default ProductPage;
