import AuthStore from './authStore';
import DoctorsStore from './doctorsStore';
import PatientsStore from './patientsStore';

const stores = {
  authStore: new AuthStore(),
  doctorsStore: new DoctorsStore(),
  patientsStore: new PatientsStore(),
};

export default stores;