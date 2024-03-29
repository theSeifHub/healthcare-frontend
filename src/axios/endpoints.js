// user auth
export const login = "/user/login/";
export const registerUser = "/user/register/";
export const getCurrentUser = "/user/get-user/";

// doctors
export const createDoctor = "/doctor/create/";
export const getDoctorsList = "/doctor/index/";
export const filterDoctorsBySpeciality = (specialityId) => `/doctor/index/?speciality=${specialityId}`;
export const getSpecialitiesList = "/doctor/list/";
export const getDrDataById = (id) => `/doctor/show/${id}/`;

// doctor services
export const createBloodBankService = "/bloodbank/create/";
export const getTotalBloodBags = (type) => `/bloodbank/total_amount/${type}/`;
export const createBloodBagsRequest = "/bloodbank/create_bloodbank_request/";
export const createIncubatorService = "/incubator/create/";
export const getReservedIncubators = "/incubator/reserved_incubators/";
export const createICUService = "/icu/create/";
export const getReservedICUBeds = "/icu/reserved_icu_beds/";
export const createSurgeryRoomService = "/surgery/create/";
const surgeriesListSlugs = { upcoming: "index_upcoming", past: "index_past" }
export const getSurgeriesList = (type) => `/surgery/${surgeriesListSlugs[type]}/`;

// patients
export const createPatient = "/patient/create/";
export const getPatientsList = "/patient/index/";
export const createPatientService = "/service/create/";
export const getPatientServicesList = "/service/index/";

// schedule
export const showDoctorSchedule = (id) => `/schedule/show/${id}/`;
export const getReservedDoctorSchedule = "/schedule/list_reserved/";
export const createDoctorSchedule = "/schedule/create/";
export const getDrAvailableAppointments = (id) => `/schedule/list_available/${id}/`;
export const createNewAppointment = (id) => `/schedule/reserve/${id}/`;
