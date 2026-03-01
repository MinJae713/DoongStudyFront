import axios from "axios";

// const baseURL = 'http://localhost:8080';
// const baseURL = 'http://158.247.211.116:8080';
const baseURL = '';

const instance = axios.create({
  baseURL,
  withCredentials: true, // ⭐️ 쿠키(리프레시 토큰)를 주고받기 위해 필수!
});

export const contextPath = '/api';

export const refresh = async () => {
  try {
    const response = await instance.post(`${contextPath}/auth/refresh`, {}, {
      headers: {
        "Refresh-Token": localStorage.refreshToken
      }
    });
    if (response.data) {
      localStorage.setItem("accessToken", "Bearer "+response.data.accessToken);
      localStorage.setItem("refreshToken", response.data.refreshToken);
      return true;
    }
    return false;
  } catch (e) { // refresh token 만료인 경우
    return false;
  }  
}

export default instance;