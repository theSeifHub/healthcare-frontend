import { makeAutoObservable } from 'mobx';
import axiosInstance from '../axios/instance';
import {
  createBloodBankService,
  createIncubatorService,
  createICUService,
  createSurgeryRoomService,
  getSurgeriesList,
} from "../axios/endpoints";
import stores from '.';


export default class DoctorServicesStore {
  upcomingSurgeries = [];
  pastSurgeries = [];

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

  setUpcomingSurgeries(list) {
    this.upcomingSurgeries = list
  };

  setPastSurgeries(list) {
    this.pastSurgeries = list
  };

  async getSurgeries(type) {
    try {
      const { data: surgeriesRes } = await axiosInstance.get(getSurgeriesList(type), {
        headers: { Authorization: `Bearer ${stores.authStore.accessToken}` },
      });

      if (type === "past") {
        this.setPastSurgeries(surgeriesRes);
      } else {
        this.setUpcomingSurgeries(surgeriesRes);
      }
    } catch (error) {
      console.error(error.response);
      throw error.response;
    }
  }
};
