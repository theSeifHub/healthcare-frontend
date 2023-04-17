import AuthStore from './authStore';
import DoctorsStore from './doctorsStore';

const stores = {
  authStore: new AuthStore(),
  doctorsStore: new DoctorsStore(),
};

export default stores;