import { makeAutoObservable } from 'mobx';
import axiosInstance from '../axios/instance';
import { createDoctor, filterDoctorsBySpeciality, getDoctorsList, getSpecialitiesList } from "../axios/endpoints";
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

      return Promise.resolve(drRes);
    } catch (error) {
      console.error(error.response);
      throw error.response;
    }
  }

  async getDoctorsList(specialityId) {
    const headers = { Authorization: `Bearer ${stores.authStore.accessToken}` };
    try {
      let drsListRes;

      if (specialityId) {
        const { data } = await axiosInstance.get(filterDoctorsBySpeciality(specialityId), {
          headers
        });
        drsListRes = data;
      } else {
        const { data } = await axiosInstance.get(getDoctorsList, {
          headers
        });
        drsListRes = data;
      }

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

      return Promise.resolve(specsListRes);
    } catch (error) {
      console.error(error.response);
      throw error.response;
    }
  }
};
