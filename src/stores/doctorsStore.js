import { makeAutoObservable } from 'mobx';
import axiosInstance from '../axios/instance';
import {
  createDoctor,
  filterDoctorsBySpeciality,
  getDoctorsList,
  getSpecialitiesList,
  getDrDataById,
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
      const { data: drRes } = await axiosInstance.post(createDoctor, newDrData);

      return Promise.resolve(drRes);
    } catch (error) {
      console.error(error.response);
      throw error.response;
    }
  }

  async getDoctorsList(specialityId) {
    try {
      if (specialityId) {
        const { data } = await axiosInstance.get(filterDoctorsBySpeciality(specialityId));
        this.doctorsList = data;
      } else {
        const { data } = await axiosInstance.get(getDoctorsList);
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

  async getDoctorDataById(id) {
    try {
      const { data: drDataRes } = await axiosInstance.get(getDrDataById(id));
      return Promise.resolve(drDataRes);
    } catch (error) {
      console.error(error.response);
      throw error.response;
    }
  }
};
