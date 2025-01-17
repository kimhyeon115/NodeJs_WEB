import { Navbar, Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState } from "react";
import LoginModal from "./LoginModal";

function NavigationBar() {
  const [showLogin, setShowLogin] = useState(false);

  const handleShowLogin = () => setShowLogin(true);
  const handleCloseLogin = () => setShowLogin(false);

  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand as={Link} to="/" style={{ color: "white" }}>
            Simple Shop
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link as={Link} to="/manage" style={{ color: "white" }}>
                상품관리
              </Nav.Link>
              <Nav.Link as={Link} to="/products" style={{ color: "white" }}>
                상품정보
              </Nav.Link>
              <Nav.Link as={Link} to="/cart" style={{ color: "white" }}>
                장바구니
              </Nav.Link>
              <Nav.Link onClick={handleShowLogin} style={{ color: "white" }}>
                로그인
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <LoginModal show={showLogin} handleClose={handleCloseLogin} />
    </>
  );
}

export default NavigationBar;
