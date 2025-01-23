import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavigationBar from "./components/Navbar";
import ProductPage from "./components/ProductPage";
import CartPage from "./components/CartPage";
import ProductManagePage from "./components/ProductManagePage";
import LoginModal from "./components/LoginModal";
import { Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import axios from "axios";


function App() {

  /* 상태 관리 */
  const [showLogin, setShowLogin] = useState(false);                            // 로그인 모달 상태
  const [isLoggedIn, setIsLoggedIn] = useState(false);                          // 로그인 여부 상태
  const [userInfo, setUserInfo] = useState({id: "", email: "", username: ""});  // 로그인 정보 상태

  /* 로그인 모달 열기/닫기 핸들러 */
  const handleShowLogin = () => setShowLogin(true);                             // 로그인 모달 열기
  const handleCloseLogin = () => setShowLogin(false);                           // 로그인 모달 닫기

  /* 로그인 성공 핸들러 */
  const handleLoginSuccess = (user) => {
    setIsLoggedIn(true);
    setUserInfo(user);
    setShowLogin(false);
  };

  /* 로그아웃 핸들러 */
  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserInfo({id: "", email: "", username: ""});
    localStorage.removeItem("token");
  };

  /* JWT 토큰 검증 요청 */
  useEffect(() => {
    const token = localStorage.getItem("token");
    const resetAuthState = () => {
      setIsLoggedIn(false);
      setUserInfo({ id: "", email: "", username: "" });
      localStorage.removeItem("token");
    };

    if (!token) {
      resetAuthState();
      return;
    }

    axios.get(`${process.env.REACT_APP_API_URL}/users/me`, { 
      headers: {
        Authorization: `Bearer ${token}`,
        'Cache-Control': 'no-cache',
      } 
    })
      .then(response => {
        if (response.status === 200 && response.data.status === 200) {
          setIsLoggedIn(true);
          console.log(response);
          const user = response.data.body[0];
          setUserInfo({ id:user.id, email: user.email, username: user.username });
        } else {
          resetAuthState();
          console.log(response.data.message);
        }
      })
      .catch(error => {
        console.log("JWT 토큰 검증 실패:", error);
        resetAuthState();
      });
  }, []);

  return (
    <Router>
      <NavigationBar
        isLoggedIn={isLoggedIn}
        userInfo={userInfo}
        handleLogout={handleLogout}
        handleShowLogin={handleShowLogin}
      />
      <LoginModal
        show={showLogin}
        handleClose={handleCloseLogin}
        onSuccess={handleLoginSuccess}
      />
      <Container>
        <Routes>
          <Route path="/" element={<ProductPage />} />
          <Route path="/products" element={<ProductPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/manage" element={<ProductManagePage />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
