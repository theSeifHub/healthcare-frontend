import React from 'react';
import {
  AppBar, Typography,
} from '@mui/material';
import {
  Link as RouterLink,
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

const pageRoutes = [
  {
    name: 'Home',
    path: '/',
  },
  {
    name: 'About Us',
    path: '/about-us',
  },
  {
    name: 'Services',
    path: '/services',
  },
  {
    name: 'Doctors',
    path: '/doctors',
  },
  {
    name: 'Book',
    path: '/booking',
  },
];

const App = () => {
  return (
    <>
      <AppBar>
        <img src={require('./assets/img/navbar-logo.png')} alt='logo' width={140} height={50} />
        <nav>
          <ul style={{ listStyleType: 'none', margin: 0, padding: 10, display: "flex", gap: 20 }}>
            {pageRoutes.map((pr, index) => (
              <li key={index} style={{}}>
                <RouterLink to={pr.path} style={{ textDecoration: "none" }}>
                  <Typography color='default'>
                    {pr.name}
                  </Typography>
                </RouterLink>
              </li>
            ))}
          </ul>
        </nav>
      </AppBar>
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
