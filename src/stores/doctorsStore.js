import { makeAutoObservable } from 'mobx';
import axiosInstance from '../axios/instance';
import {
  createDoctor,
  filterDoctorsBySpeciality,
  getDoctorsList,
  getSpecialitiesList,
} from "../axios/endpoints";
import stores from '.';


export default class DoctorsStore {
  doctorsList = [];
  specialitiesList = [];

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
      if (specialityId) {
        const { data } = await axiosInstance.get(filterDoctorsBySpeciality(specialityId), {
          headers
        });
        this.doctorsList = data;
      } else {
        const { data } = await axiosInstance.get(getDoctorsList, {
          headers
        });
        this.doctorsList = data;
      }
    } catch (error) {
      console.error(error.response);
      throw error.response;
    }
  }

  async getSpecialitiesList() {
    try {
      const { data: specsListRes } = await axiosInstance.get(getSpecialitiesList);
      this.specialitiesList = specsListRes;
    } catch (error) {
      console.error(error.response);
      throw error.response;
    }
  }
};
