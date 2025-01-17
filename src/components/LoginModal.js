import { Modal, Form, Button } from "react-bootstrap";
import { useState } from "react";

function LoginModal({ show, handleClose }) {
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: 로그인 로직 구현
    console.log("Login attempt with:", loginData);
    handleClose();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>로그인</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>아이디</Form.Label>
            <Form.Control
              type="text"
              name="username"
              value={loginData.username}
              onChange={handleChange}
              placeholder="아이디를 입력하세요"
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>비밀번호</Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={loginData.password}
              onChange={handleChange}
              placeholder="비밀번호를 입력하세요"
              required
            />
          </Form.Group>
          <div className="d-grid gap-2">
            <Button variant="primary" type="submit">
              로그인
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default LoginModal;
