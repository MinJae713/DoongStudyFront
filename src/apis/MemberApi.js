import { defineStore } from "pinia";
import instance, {contextPath, refresh} from "./CommonAxios";

export const memberApi = defineStore("memberApi", () => {
  const domain = 'member';
  const localStorage = window.localStorage;
  
  const login = async (email, password) => {
    const response = await instance.post(`${contextPath}/${domain}/login`, {
      email, password
    });
    return response.data;
  }
  const register = async (registerForm) => {
    try {
      const response = await instance.post(`${contextPath}/${domain}/register`, registerForm);
      return response.data
    } catch (e) {
      return e.response ? e.response : {
        apiResult: false,
        message: "서버 통신 오류입니다"
      }
    }
  }
  const logout = async () => {
    const response = await instance.post(`${contextPath}/auth/logout`, {}, {
      headers: {
        Authorization: localStorage.accessToken,
        "Refresh-Token": localStorage.refreshToken
      }
    });
    return response.data;
  }
  const getMembers = async () => {
    let response = null
    try {
      response = await instance.get(`${contextPath}/${domain}`, {
        headers: {
          Authorization: localStorage.accessToken
        }
      });
    } catch (e) {
      const refreshed = await refresh();
      if (refreshed)
        response = await instance.get(`${contextPath}/${domain}`, {
          headers: {
            Authorization: localStorage.accessToken
          }
        });
      else return false;
    }
    return response.data;
  }
  const getMemberById = async (memberId) => {
    let response = null;
    try {
      response = await instance.get(`${contextPath}/${domain}/${memberId}`, {
        headers: {
          Authorization: localStorage.accessToken
        }
      });
    } catch (e) {
      const refreshed = await refresh();
      if (refreshed)
        response = await instance.get(`${contextPath}/${domain}/${memberId}`, {
          headers: {
            Authorization: localStorage.accessToken
          }
        });
      else return false;
    }
    
    return response.data;
  }
  const deleteMember = async (memberId) => {
    let response = null;
    try {
      response = await instance.delete(`${contextPath}/${domain}/${memberId}`, {
        headers: {
          Authorization: localStorage.accessToken
        }
      });
    } catch (e) {
      const refreshed = await refresh();
      if (refreshed)
        response = await instance.delete(`${contextPath}/${domain}/${memberId}`, {
          headers: {
            Authorization: localStorage.accessToken
          }
        });
      else return false;
    }
    
    return response.data;
  }
  return {
    login,
    register,
    logout,
    getMembers,
    getMemberById,
    deleteMember
  }
});