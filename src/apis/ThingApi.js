import { defineStore } from "pinia";
import instance, {contextPath} from "./CommonAxios";

export const thingApi = defineStore("thingApi", () => {
  const domain = 'thing';
  const getThings = async () => {
    const response = await instance.get(`${contextPath}/${domain}`);
    return response.data;
  }
  const getThingById = async (thingId) => {
    const response = await instance.get(`${contextPath}/${domain}/${thingId}`);
    return response.data;
  }
  const createThing = async (thingCreateForm) => {
    const response = await instance.post(`${contextPath}/${domain}`, thingCreateForm);
    return response.data;
  }
  const updateThing = async (thingUpdateForm) => {
    const response = await instance.patch(`${contextPath}/${domain}`, thingUpdateForm);
    return response.data;
  }
  const deleteThing = async (thingId) => {
    const response = await instance.delete(`${contextPath}/${domain}/${thingId}`);
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