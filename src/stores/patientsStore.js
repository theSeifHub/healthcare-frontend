import { makeAutoObservable } from 'mobx';
import axiosInstance from '../axios/instance';
import {
  createPatient,
  createPatientService,
  getPatientsList,
  getPatientServicesList,
} from "../axios/endpoints";
import stores from '.';


export default class PatientsStore {
  patientsList = [];
  patientsServicesList = [];

  constructor() {
    makeAutoObservable(this);
  }

  async createNewPatient(newPatientData) {
    try {
      const { data: patientRes } = await axiosInstance.post(createPatient, newPatientData);
      return Promise.resolve(patientRes);
    } catch (error) {
      console.error(error.response);
      throw error.response;
    }
  }

  async createNewPatientService(newServiceData) {
    try {
      const { data: serviceRes } = await axiosInstance.post(
        createPatientService, newServiceData
      );
      return Promise.resolve(serviceRes);
    } catch (error) {
      console.error(error.response);
      throw error.response;
    }
  }

  async getPatientsList() {
    try {
      const { data } = await axiosInstance.get(getPatientsList);
      this.patientsList = data;

    } catch (error) {
      console.error(error.response);
      throw error.response;
    }
  }

  setPatientsServicesList(list) {
    this.patientsServicesList = list;
  }

  async getPatientServicesList() {
    try {
      const { data } = await axiosInstance.get(getPatientServicesList);
      this.setPatientsServicesList(data);
    } catch (error) {
      console.error(error.response);
      throw error.response;
    }
  }
};
