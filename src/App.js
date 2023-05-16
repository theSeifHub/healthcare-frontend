import React from 'react';
import {
  Route,
  Routes,
} from 'react-router-dom';
import {
  AboutUs,
  Booking,
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
} from './screens';
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";

const routes = [
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
  // {
  //   path: '/doctor/services/icu',
  //   element: <CareRoomBook />,
  //   exact: true,
  // },
  // {
  //   path: '/doctor/services/surgery',
  //   element: <SurgeryBook />,
  //   exact: true,
  // },
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
    element: <Booking />,
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
];

const App = () => {
  return (
    <>
      <NavBar />
      <Routes>
        {routes.map(r => (
          <Route
            key={r.path}
            path={r.path}
            element={r.element}
            exact={r.exact}
          />
        ))}
      </Routes>
      <Footer />
    </>
  );
}

export default App;
