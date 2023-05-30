import { makeAutoObservable } from 'mobx';
import axiosInstance from '../axios/instance';
import {
  createBloodBankService,
  createIncubatorService,
  createICUService,
  createSurgeryRoomService,
  getSurgeriesList,
  getTotalBloodBags,
  createBloodBagsRequest,
  getReservedIncubators,
  getReservedICUBeds,
} from "../axios/endpoints";

export default class DoctorServicesStore {
  upcomingSurgeries = [];
  pastSurgeries = [];
  reservedIncubators = [];
  reservedICUBeds = [];

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
        endpoint, newServiceData,
      );

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
      const { data: surgeriesRes } = await axiosInstance.get(getSurgeriesList(type));

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

  async getBloodTypeAmount(type) {
    try {
      const { data: bagsRes } = await axiosInstance.get(getTotalBloodBags(type));

      return Promise.resolve(bagsRes);
    } catch (error) {
      console.error(error.response);
      throw error.response;
    }
  }

  async createBloodBankBagRequest(bagsRequest) {
    try {
      const { data: requestRes } = await axiosInstance.post(
        createBloodBagsRequest, bagsRequest,
      );

      return Promise.resolve(requestRes);
    } catch (error) {
      console.error(error.response);
      throw error.response;
    }
  }

  setReservedIncubators(list) {
    this.reservedIncubators = list
  };

  async getReservedIncubators() {
    try {
      const { data: incubatorsRes } = await axiosInstance.get(getReservedIncubators);

      this.setReservedIncubators(incubatorsRes);
    } catch (error) {
      console.error(error.response);
      throw error.response;
    }
  }

  setReservedICUBeds(list) {
    this.reservedICUBeds = list
  };

  async getReservedICUBeds() {
    try {
      const { data: icuRes } = await axiosInstance.get(getReservedICUBeds);

      this.setReservedICUBeds(icuRes);
    } catch (error) {
      console.error(error.response);
      throw error.response;
    }
  }

};
