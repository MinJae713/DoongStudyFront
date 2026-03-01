import { defineStore } from "pinia";
import instance, {contextPath, refresh} from "./CommonAxios";

export const thingApi = defineStore("thingApi", () => {
  const domain = 'thing';
  const localStorage = window.localStorage;

  const getThings = async (memberId) => {
    let response = null
    
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
  const getThingById = async (thingId, memberId) => {
    let response = null;
    
    try {
      response = await instance.get(`${contextPath}/${domain}/${thingId}/${memberId}`, {
        headers: {
          Authorization: localStorage.accessToken
        }
      });
    } catch (e) {
      const refreshed = await refresh();
      if (refreshed)
        response = await instance.get(`${contextPath}/${domain}/${thingId}/${memberId}`, {
          headers: {
            Authorization: localStorage.accessToken
          }
        });
      else return false;
    } 
    return response.data;
  }
  const createThing = async (thingCreateForm) => {
    let response = null;
    
    try {
      response = await instance.post(`${contextPath}/${domain}`, thingCreateForm, {
        headers: {
          Authorization: localStorage.accessToken
        }
      });
    } catch (e) {
      const refreshed = await refresh();
      if (refreshed)
        response = await instance.post(`${contextPath}/${domain}`, thingCreateForm, {
          headers: {
            Authorization: localStorage.accessToken
          }
        });
      else return false;
    }
    return response.data;
  }
  const updateThing = async (thingUpdateForm) => {
    let response = null;
    
    try {
      response = await instance.patch(`${contextPath}/${domain}`, thingUpdateForm, {
        headers: {
          Authorization: localStorage.accessToken
        }
      });
    } catch (e) {
      const refreshed = await refresh();
      if (refreshed)
        response = await instance.patch(`${contextPath}/${domain}`, thingUpdateForm, {
          headers: {
            Authorization: localStorage.accessToken
          }
        });
      else return false;
    }
    return response.data;
  }
  const deleteThing = async (thingId) => {
    let response = null;
    
    try {
      response = await instance.delete(`${contextPath}/${domain}/${thingId}`, {
        headers: {
          Authorization: localStorage.accessToken
        }
      });
    } catch (e) {
      const refreshed = await refresh();
      if (refreshed)
        response = await instance.delete(`${contextPath}/${domain}/${thingId}`, {
          headers: {
            Authorization: localStorage.accessToken
          }
        });
      else return false;
    }
    return response.data;
  }
  return {
    getThings,
    getThingById,
    createThing,
    updateThing,
    deleteThing
  }
});