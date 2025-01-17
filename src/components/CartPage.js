import { Container, Row, Col, ListGroup, Button } from "react-bootstrap";

function CartPage() {
  // 임시 장바구니 데이터
  const cartItems = [
    { id: 1, title: "상품 1", price: 29.99, quantity: 2 },
    { id: 2, title: "상품 2", price: 39.99, quantity: 1 },
  ];

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <Container className="mt-4">
      <h2>장바구니</h2>
      <ListGroup className="mt-3">
        {cartItems.map((item) => (
          <ListGroup.Item
            key={item.id}
            className="d-flex justify-content-between align-items-center"
          >
            <div>
              <h5>{item.title}</h5>
              <p className="mb-0">수량: {item.quantity}</p>
            </div>
            <div>
              <h5>${(item.price * item.quantity).toFixed(2)}</h5>
              <Button variant="danger" size="sm">
                삭제
              </Button>
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>
      <Row className="mt-4">
        <Col className="text-end">
          <h4>총계: ${total.toFixed(2)}</h4>
          <Button variant="primary">주문하기</Button>
        </Col>
      </Row>
    </Container>
  );
}

export default CartPage;
