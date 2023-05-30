import { makeAutoObservable } from 'mobx';
import axiosInstance from '../axios/instance';
import {
  showDoctorSchedule,
  getReservedDoctorSchedule,
  createDoctorSchedule,
  getDrAvailableAppointments,
  createNewAppointment,
} from "../axios/endpoints";

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
        createDoctorSchedule, newSchedule,
      );
      return Promise.resolve(scheduleRes);
    } catch (error) {
      console.error(error.response);
      throw error.response;
    }
  }

  async getDoctorSchedule(drId) {
    try {
      const { status, data: scheduleRes } = await axiosInstance.get(showDoctorSchedule(drId));

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
      const { data: appRes } = await axiosInstance.get(getReservedDoctorSchedule);

      this.setReservedAppointments(appRes)
    } catch (error) {
      console.error(error.response);
      throw error.response;
    }
  }

  async getAvailableAppointmentsByDrId(id) {
    try {
      const { data: drScheduleRes } = await axiosInstance.get(getDrAvailableAppointments(id));
      return Promise.resolve(drScheduleRes);
    } catch (error) {
      console.error(error.response);
      throw error.response;
    }
  }

  async reserveAppointment(appId) {
    try {
      const { data: appRes } = await axiosInstance.put(createNewAppointment(appId));
      return Promise.resolve(appRes);
    } catch (error) {
      console.error(error.response);
      throw error.response;
    }
  }
};
