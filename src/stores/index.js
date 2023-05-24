import AuthStore from './authStore';
import DoctorsStore from './doctorsStore';
import PatientsStore from './patientsStore';
import DoctorServicesStore from './doctorServicesStore';
import ScheduleStore from './scheduleStore';

const stores = {
  authStore: new AuthStore(),
  doctorsStore: new DoctorsStore(),
  patientsStore: new PatientsStore(),
  doctorServicesStore: new DoctorServicesStore(),
  scheduleStore: new ScheduleStore(),
};

export default stores;