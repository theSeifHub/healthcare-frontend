import { makeAutoObservable } from 'mobx';
import axiosInstance from '../axios/instance';
import {
  createBloodBankService,
} from "../axios/endpoints";
import stores from '.';


export default class DoctorServicesStore {

  constructor() {
    makeAutoObservable(this);
  }

  async createNewBloodBankService(newServiceData) {
    try {
      const { data: serviceRes } = await axiosInstance.post(
        createBloodBankService,
        newServiceData,
        {
          headers: { Authorization: `Bearer ${stores.authStore.accessToken}` },
        });

      return Promise.resolve(serviceRes);
    } catch (error) {
      console.error(error.response);
      throw error.response;
    }
  }

};
