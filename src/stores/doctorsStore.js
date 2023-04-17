import { makeAutoObservable } from 'mobx';
import axiosInstance from '../axios/instance';
import { createDoctor } from "../axios/endpoints";
import stores from '.';


export default class DoctorsStore {

  constructor() {
    makeAutoObservable(this);
  }

  async createDoctor(newDrData) {
    try {
      const { data: drRes } = await axiosInstance.post(createDoctor, newDrData, {
        headers: { Authorization: `Bearer ${stores.authStore.accessToken}` }
      });
      console.log("Created doctor successfully >> ", drRes);
      return Promise.resolve(drRes);
    } catch (error) {
      console.error(error.response);
      throw error.response;
    }
  }
};
