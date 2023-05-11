import { makeAutoObservable } from 'mobx';
import axiosInstance from '../axios/instance';
import { createDoctor, getDoctorsList, getSpecialitiesList } from "../axios/endpoints";
import stores from '.';


export default class DoctorsStore {

  constructor() {
    makeAutoObservable(this);
  }

  async createNewDoctor(newDrData) {
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

  async getDoctorsList() {
    try {
      const { data: drsListRes } = await axiosInstance.get(getDoctorsList, {
        headers: { Authorization: `Bearer ${stores.authStore.accessToken}` }
      });
      console.log("Got doctors list successfully >> ", drsListRes);
      return Promise.resolve(drsListRes);
    } catch (error) {
      console.error(error.response);
      throw error.response;
    }
  }

  async getSpecialitiesList() {
    try {
      const { data: specsListRes } = await axiosInstance.get(getSpecialitiesList, {
        headers: { Authorization: `Bearer ${stores.authStore.accessToken}` }
      });
      console.log("Got specialities list successfully >> ", specsListRes);
      return Promise.resolve(specsListRes);
    } catch (error) {
      console.error(error.response);
      throw error.response;
    }
  }
};
