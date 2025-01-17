const cors = require("cors");
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const userRoutes = require('./server/routes/UserRoutes');
const productRoutes = require('./server/routes/ProductRoutes');

const app = express();
const port = 8080;

// 미들웨어를 먼저 설정
app.use(cors()); // CORS 미들웨어 추가
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// API 라우트 설정
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);

// 정적 파일 제공
app.use(express.static(path.join(__dirname, "build")));

// 모든 요청을 React 앱으로 라우팅 (맨 마지막에 위치)
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.listen(port, () => console.log(`Listening on port ${port}`));
