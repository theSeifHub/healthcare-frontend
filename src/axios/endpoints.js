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
export const createIncubatorService = "/incubator/create/";
export const createICUService = "/icu/create/";
export const createSurgeryRoomService = "/surgery/create/";

// patients
export const createPatient = "/patient/create/";
export const getPatientsList = "/patient/index/";
export const createPatientService = "/service/create/";

// schedule
export const showDoctorSchedule = (id) => `/schedule/show/${id}/`;
export const getReservedDoctorSchedule = "/schedule/list_reserved/";