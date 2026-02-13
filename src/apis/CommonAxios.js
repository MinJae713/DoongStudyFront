import axios from "axios";

const baseURL = 'http://localhost:8081';

const instance = axios.create({
  baseURL,
  withCredentials: true, // ⭐️ 쿠키(리프레시 토큰)를 주고받기 위해 필수!
});

export const contextPath = '/api';

export default instance;