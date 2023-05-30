import { makeAutoObservable } from 'mobx';
import axiosInstance from '../axios/instance';
import {
  createDoctor,
  filterDoctorsBySpeciality,
  getDoctorsList,
  getSpecialitiesList,
  getDrDataById,
} from "../axios/endpoints";

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

  setDoctorsList(list) {
    this.doctorsList = list;
  }

  async getDoctorsList(specialityId) {
    try {
      if (specialityId) {
        const { data } = await axiosInstance.get(filterDoctorsBySpeciality(specialityId));
        this.setDoctorsList(data);
      } else {
        const { data } = await axiosInstance.get(getDoctorsList);
        this.setDoctorsList(data);
      }
    } catch (error) {
      console.error(error.response);
      throw error.response;
    }
  }

  setSpecialitiesList(list) {
    this.specialitiesList = list;
  }

  async getSpecialitiesList() {
    try {
      const { data: specsListRes } = await axiosInstance.get(getSpecialitiesList);
      this.setSpecialitiesList(specsListRes);
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
