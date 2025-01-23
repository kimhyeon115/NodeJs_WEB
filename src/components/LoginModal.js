import { Modal, Form, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import axios from "axios";


function LoginModal({ show, handleClose, onSuccess  }) {

  /* 상태 관리 */
  const [loading, setLoading] = useState(false);                            // 로그인 버튼 상태
  const [loginData, setLoginData] = useState({email: "", password: "",});   // 로그인 정보 상태
  const [errorMessage, setErrorMessage] = useState("");                     // 에러 메시지 정보 상태

  /* 로그인 버튼 핸들러 */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      /* 로그인 요청 */
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/users/login`, loginData);
      console.log('response', response);

      /* 성공 처리 */
      if (response.status === 200 && response.data.status === 200) {
        localStorage.setItem("token", response.data.token);
        const user = response.data.body[0];
        onSuccess({
          id: user.id,
          email: user.email,
          username: user.username
        });
        handleClose();
      } else {
        setErrorMessage(response.data.message);
      }
    } catch (error) {
      console.error("로그인 실패:", error);
      setErrorMessage(
        error.response?.data?.message || "로그인에 실패했습니다. 다시 시도해주세요."
      );
    } finally {
      setLoading(false);
    }
  };

  /* 입력한 로그인 정보 변경 핸들러 */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /* 로그인 실패 에러 메시지 초기화 */
  useEffect(() => {
    if (!show) {
      setErrorMessage("");     // 모달 닫힐 때 초기화
    }
  }, [show]);

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>로그인</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>이메일</Form.Label>
            <Form.Control
              type="text"
              name="email"
              value={loginData.email}
              onChange={handleChange}
              placeholder="이메일을 입력하세요"
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
          {errorMessage && (
            <div className="text-danger mb-3">
              {errorMessage}
            </div>
          )}
          <div className="d-grid gap-2">
            <Button variant="primary" type="submit" disabled={loading}>
              {loading ? '로그인 중...' : '로그인'}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default LoginModal;
