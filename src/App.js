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
  Services,
} from './screens';
import NavBar from "./components/NavBar";

const App = () => {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path={'/'} element={<Home />} />
        <Route path={'/about-us'} element={<AboutUs />} />
        <Route path={'/services'} element={<Services />} />
        <Route path={'/doctors'} element={<Doctors />} />
        <Route path={'/booking'} element={<Booking />} />
        <Route path={'/sign-up'} element={<SignUp />} />
        <Route path={'/sign-in'} element={<SignIn />} />
      </Routes>
    </>
  );
}

export default App;
