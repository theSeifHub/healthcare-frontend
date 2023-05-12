// user auth
export const login = "/user/login/";
export const registerUser = "/user/register/";
export const getCurrentUser = "/user/get-user/";

// doctors
export const createDoctor = "/doctor/create/";
export const getDoctorsList = "/doctor/index/";
export const filterDoctorsBySpeciality = (specialityId) => `/doctor/index/?speciality=${specialityId}`;
export const getSpecialitiesList = "/doctor/list/";

// doctor services
export const createBloodBankService = "/bloodbank/create/";

// patients
export const createPatient = "/patient/create/";
export const createPatientService = "/service/create/";
