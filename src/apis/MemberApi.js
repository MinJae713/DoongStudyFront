import { defineStore } from "pinia";
import instance, {contextPath} from "./CommonAxios";

export const memberApi = defineStore("memberApi", () => {
  const domain = 'member';
  
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
  const getMembers = async () => {
    const response = await instance.get(`${contextPath}/${domain}`);
    return response.data;
  }
  const getMemberById = async (memberId) => {
    const response = await instance.get(`${contextPath}/${domain}/${memberId}`);
    return response.data;
  }
  const deleteMember = async (memberId) => {
    const response = await instance.delete(`${contextPath}/${domain}/${memberId}`);
    return response.data;
  }
  return {
    login,
    register,
    getMembers,
    getMemberById,
    deleteMember
  }
});