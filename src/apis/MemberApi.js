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
  return {
    login
  }
});