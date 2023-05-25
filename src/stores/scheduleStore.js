import { makeAutoObservable } from 'mobx';
import axiosInstance from '../axios/instance';
import {
  showDoctorSchedule,
  getReservedDoctorSchedule,
  createDoctorSchedule,
} from "../axios/endpoints";
import stores from '.';


export default class ScheduleStore {
  currentDrScheduleDetails = null;
  reservedAppointments = [];

  constructor() {
    makeAutoObservable(this);
  }

  setCurrentDrSchedule(schedule) {
    this.currentDrScheduleDetails = schedule;
  }

  setReservedAppointments(appointments) {
    this.reservedAppointments = appointments;
  }

  async createDoctorSchedule(newSchedule) {
    try {
      const { data: scheduleRes } = await axiosInstance.post(
        createDoctorSchedule,
        newSchedule,
        { headers: { Authorization: `Bearer ${stores.authStore.accessToken}` } },
      );
      return Promise.resolve(scheduleRes);
    } catch (error) {
      console.error(error.response);
      throw error.response;
    }
  }

  async getDoctorSchedule(drId) {
    try {
      const { status, data: scheduleRes } = await axiosInstance.get(showDoctorSchedule(drId), {
        headers: { Authorization: `Bearer ${stores.authStore.accessToken}` }
      });

      if (status === 200) {
        this.setCurrentDrSchedule(scheduleRes);
      }
    } catch (error) {
      if (error.response.status === 404) {
        this.setCurrentDrSchedule(null);
      }
      console.error(error.response);
      throw error.response;
    }
  }

  async getReservedAppointments() {
    try {
      const { data: appRes } = await axiosInstance.get(getReservedDoctorSchedule, {
        headers: { Authorization: `Bearer ${stores.authStore.accessToken}` }
      });

      this.setReservedAppointments(appRes)
    } catch (error) {
      console.error(error.response);
      throw error.response;
    }
  }
};
