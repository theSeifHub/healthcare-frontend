import { makeAutoObservable } from 'mobx';
import axiosInstance from '../axios/instance';
import { createPatient, createPatientService } from "../axios/endpoints";
import stores from '.';


export default class PatientsStore {

  constructor() {
    makeAutoObservable(this);
  }

  async createNewPatient(newPatientData) {
    try {
      const { data: patientRes } = await axiosInstance.post(
        createPatient, newPatientData, {
        headers: { Authorization: `Bearer ${stores.authStore.accessToken}` }
      });
      return Promise.resolve(patientRes);
    } catch (error) {
      console.error(error.response);
      throw error.response;
    }
  }

  async createNewPatientService(newServiceData) {
    try {
      const { data: serviceRes } = await axiosInstance.post(
        createPatientService, newServiceData, {
        headers: { Authorization: `Bearer ${stores.authStore.accessToken}` }
      });
      return Promise.resolve(serviceRes);
    } catch (error) {
      console.error(error.response);
      throw error.response;
    }
  }
};
