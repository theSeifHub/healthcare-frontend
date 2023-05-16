import { makeAutoObservable } from 'mobx';
import axiosInstance from '../axios/instance';
import {
  createBloodBankService,
  createIncubatorService,
  createICUService,
  createSurgeryRoomService,
} from "../axios/endpoints";
import stores from '.';


export default class DoctorServicesStore {

  constructor() {
    makeAutoObservable(this);
  }

  getServiceEndpoint(serviceId) {
    switch (serviceId) {
      case "bloodbank":
        return createBloodBankService;
      case "incubator":
        return createIncubatorService;
      case "icu":
        return createICUService;
      case "surgery":
        return createSurgeryRoomService;
      default:
        break;
    }
  }

  async createNewDoctorService(newServiceData, serviceId) {
    try {
      const endpoint = this.getServiceEndpoint(serviceId);

      const { data: serviceRes } = await axiosInstance.post(
        endpoint,
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
