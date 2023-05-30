import {
  AboutUs,
  Doctors,
  Home,
  SignIn,
  SignUp,
  DoctorSignUp,
  PatientSignUp,
  DoctorServicesLanding,
  PatientServicesLanding,
  PatientServiceBook,
  ContactUs,
  Clinics,
  DoctorServices,
  BloodBankBooking,
  NurseryBooking,
  CareRoomBooking,
  SurgeryBooking,
  DoctorProfile,
  AppointmentBooking,
} from '../screens';

const appRoutes = [
  {
    path: '/',
    element: <Home />,
    exact: true,
  },
  {
    path: '/about-us',
    element: <AboutUs />,
    exact: true,
  },
  {
    path: '/doctor/services/land',
    element: <DoctorServicesLanding />,
    exact: true,
  },
  {
    path: '/doctor/services',
    element: <DoctorServices />,
    exact: true,
  },
  {
    path: '/doctor/services/bloodbank',
    element: <BloodBankBooking />,
    exact: true,
  },
  {
    path: '/doctor/services/incubator',
    element: <NurseryBooking />,
    exact: true,
  },
  {
    path: '/doctor/services/icu',
    element: <CareRoomBooking />,
    exact: true,
  },
  {
    path: '/doctor/services/surgery',
    element: <SurgeryBooking />,
    exact: true,
  },
  {
    path: '/patient/services',
    element: <PatientServicesLanding />,
    exact: true,
  },
  {
    path: '/patient/services/book',
    element: <PatientServiceBook />,
    exact: true,
  },
  {
    path: '/patient/services/clinics',
    element: <Clinics />,
    exact: true,
  },
  {
    path: '/doctors',
    element: <Doctors />,
    exact: true,
  },
  {
    path: '/booking',
    element: <AppointmentBooking />,
    exact: true,
  },
  {
    path: '/sign-up',
    element: <SignUp />,
    exact: true,
  },
  {
    path: '/sign-up/doctor',
    element: <DoctorSignUp />,
    exact: true,
  },
  {
    path: '/sign-up/patient',
    element: <PatientSignUp />,
    exact: true,
  },
  {
    path: '/sign-in',
    element: <SignIn />,
    exact: true,
  },
  {
    path: '/contact-us',
    element: <ContactUs />,
    exact: true,
  },
  {
    path: '/me',
    element: <DoctorProfile />,
    exact: true,
  },
];

export default appRoutes;
