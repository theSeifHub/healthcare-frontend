import AuthStore from './authStore';
import DoctorsStore from './doctorsStore';
import PatientsStore from './patientsStore';
import DoctorServicesStore from './doctorServicesStore';

const stores = {
  authStore: new AuthStore(),
  doctorsStore: new DoctorsStore(),
  patientsStore: new PatientsStore(),
  doctorServicesStore: new DoctorServicesStore(),
};

export default stores;