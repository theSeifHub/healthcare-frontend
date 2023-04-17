import { makeAutoObservable } from 'mobx';
import axiosInstance from '../axios/instance';
import { createPatient } from "../axios/endpoints";
import stores from '.';


export default class PatientsStore {

  constructor() {
    makeAutoObservable(this);
  }

  async createNewPatient(newPatientData) {
    try {
      const { data: patientRes } = await axiosInstance.post(createPatient, newPatientData, {
        headers: { Authorization: `Bearer ${stores.authStore.accessToken}` }
      });
      console.log("Created patient successfully >> ", patientRes);
      return Promise.resolve(patientRes);
    } catch (error) {
      console.error(error.response);
      throw error.response;
    }
  }
};
