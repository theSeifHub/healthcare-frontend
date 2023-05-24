import { makeAutoObservable } from 'mobx';
import axiosInstance from '../axios/instance';
import {
  showDoctorSchedule,
  getReservedDoctorSchedule,
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

  async getDoctorSchedule(drId) {
    try {
      const { data: scheduleRes } = await axiosInstance.get(showDoctorSchedule(drId), {
        headers: { Authorization: `Bearer ${stores.authStore.accessToken}` }
      });

      this.setCurrentDrSchedule(scheduleRes)
    } catch (error) {
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
