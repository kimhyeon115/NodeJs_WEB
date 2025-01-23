import axios from 'axios';


/** axios 설정 **/
const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:8080/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

/** 요청 인터셉터: 요청 전에 처리 **/
axiosInstance.interceptors.request.use(
  (config) => {
    /* 로컬스토리지에서 JWT 토큰 가져오기 */
    const token = localStorage.getItem('token');
    if (token) {
      /* Authorization 헤더 추가 */
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

/** 응답 인터셉터: 응답 처리 **/
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    /* 예: 인증 실패 시 처리 */
    if (error.response?.status === 401) {
      console.error('Unauthorized! Redirecting to login...');
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
