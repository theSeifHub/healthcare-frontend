import React from "react";
import theme from "../theme";
import { Link as RouterLink } from "react-router-dom";
import { Paper, Typography } from "@mui/material";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CustomBadge from "../components/CustomBadge";

const appointmentsItems = [
  {
    img: 'view_doctor.png',
    alt: 'view doctor',
    description: 'Share your health concern here and we shall assign you a top doctor across the North East',
  },
  {
    img: 'book_visit.png',
    alt: 'book a visit',
    description: 'Book your time slot with doctor from your comfort zone',
  },
  {
    img: 'find_doctor.png',
    alt: 'find a doctor',
    description: 'With more than 1000+ doctors and on mission to provide best care Health Care Service',
  },
];

const specialities = [
  {
    img: '1-kidney.png',
    alt: 'kidney',
    title: 'Urology',
  },
  {
    img: '2-brain.png',
    alt: 'brain',
    title: 'Neurology',
  },
  {
    img: '3-bone.png',
    alt: 'bone',
    title: 'Orthopedics',
  },
  {
    img: '4-heart.png',
    alt: 'heart',
    title: 'Cardiology',
  },
  {
    img: '5-teeth.png',
    alt: 'teeth',
    title: 'Dentistry',
  },
];

const doctors = [
  {
    name: 'Dr. Marwan Mohamed',
    speciality: 'Ophthalmologist',
    clinicAddress: 'Assiut, Gomhorya Street',
    appointments: {
      days: ['Saturday', 'Monday', 'Wednesday'],
      from: '11 am',
      to: '6 pm'
    },
  },
  {
    name: 'Dr. Nourhan Mamdouh',
    speciality: 'General Practitioner',
    clinicAddress: 'Assiut, El-Nemes Street',
    appointments: {
      days: ['Sunday', 'Tuesday', 'Thursday'],
      from: '12 pm',
      to: '8 pm'
    },
  },
  {
    name: 'Dr. Alaa Mahmoud',
    speciality: 'Obstetrician and Gynecologist',
    clinicAddress: 'Assiut, El-Mohaza Street',
    appointments: {
      days: ['Wednesday', 'Thursday', 'Friday'],
      from: '11 am',
      to: '6 pm'
    },
  },
];

const Home = () => {
  const {
    spacing,
    palette: { primary, background }
  } = theme;
  return (
    <>
      <section style={{ marginTop: spacing(2), display: "flex" }}>
        <div>
          <img
            alt='hero: doctor amusing child in their office'
            src={require('../assets/img/hero.png')}
            width={spacing(70)} height={spacing(55)}
          />
        </div>
        <div style={{
          width: spacing(80),
          display: "flex",
          flexDirection: 'column',
          alignItems: "center",
          justifyContent: 'space-between',
          padding: spacing(6),
        }}>
          <Paper elevation={0} style={{
            display: "flex",
            flexDirection: 'column',
            alignItems: "center",
          }}>
            <Typography variant='h3' fontFamily='Impact'>Stay healthy and safe!!</Typography>
            <Typography variant='h5' fontFamily='serif'>With Us You Can Keep Healthy</Typography>
          </Paper>
          <RouterLink to={"/contact-us"} style={{ textDecoration: "none", alignSelf: "flex-end" }}>
            <Typography
              variant="button"
              color={primary.contrastText}
              style={{
                width: spacing(22),
                display: 'flex',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: spacing(1),
                background: primary.main,
                padding: `${spacing(0.5)} ${spacing(1)}`,
              }}
              fontSize={spacing(2.5)}
            >
              Contact Us
              <ArrowForwardIcon
                fontSize="medium"
                viewBox={'5 2 15 20'}
                preserveAspectRatio='none'
              />
            </Typography>
          </RouterLink>
        </div>
      </section>

      <section style={{ background: background.default, padding: `${spacing(7)} ${spacing(3)}` }}>
        <Typography variant="h3" style={{ textAlign: 'center', marginBottom: spacing(5) }}>
          Discover The Online Appointment!
        </Typography>
        <div style={{ display: "flex", alignItems: "center", gap: spacing(5) }}>
          {appointmentsItems.map((item, index) => (
            <Paper key={index} style={{
              height: spacing(55),
              flex: 1,
              display: 'flex',
              flexDirection: "column",
              alignItems: "center",
              rowGap: spacing(3),
              padding: `${spacing(5)} ${spacing(2)}`,
            }}>
              <img
                src={require(`../assets/img/${item.img}`)}
                alt={item.alt}
                width={spacing(36)}
                height={spacing(40)}
              />
              <Typography
                fontFamily='sans-serif'
                variant='body2'
                fontSize={spacing(2.5)}
                textAlign="center"
              >
                {item.description}
              </Typography>
            </Paper>
          ))}
        </div>
      </section>

      <section style={{ padding: `${spacing(7)} ${spacing(3)}` }}>
        <Typography variant="h3" style={{ textAlign: 'center', marginBottom: spacing(5) }}>
          Clinics and Specialties
        </Typography>
        <div style={{ display: "flex", justifyContent: "center", gap: spacing(6) }}>
          {specialities.map((spec, index) => (
            <div key={index}>
              <CustomBadge badgeContent={''} color="secondary">
                <Paper elevation={3} style={{
                  width: spacing(25),
                  height: spacing(25),
                  borderRadius: spacing(12),
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center"
                }}>
                  <img
                    alt={spec.alt}
                    src={require(`../assets/img/${spec.img}`)}
                    width={spacing(18)}
                    height={spacing(18)}
                  />
                </Paper>
              </CustomBadge>
              <Typography fontSize={spacing(3)} textAlign='center' style={{ margin: `${spacing(3)} 0` }}>
                {spec.title}
              </Typography>
            </div>
          ))}
        </div>
      </section>

      <section style={{ background: background.default, padding: `${spacing(7)} ${spacing(3)}` }}>
        <Typography variant="h3" textAlign='center'>
          Our Doctors
        </Typography>
        <Typography
          variant="body1"
          fontFamily='serif'
          fontSize={spacing(2.5)}
          textAlign='center'
          style={{ margin: spacing(5) }}
        >
          Our team of medical experts is there for you, from finding the right doctors and hospitals to booking appointments
          and giving any kind of medical help in between.
        </Typography>
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: spacing(5),
        }}>
          {doctors.map((doc, index) => (
            <Paper key={index} style={{
              width: spacing(40),
              background: background.default,
              display: "flex",
              flexDirection: "column",
              border: `${spacing(2)} solid #fff`,
              padding: spacing(3),
            }} >
              <img
                alt="doctor icon"
                src={require('../assets/img/doctor-placeholder.png')}
                width={spacing(20)} height={spacing(24)}
                style={{ margin: spacing(5), alignSelf: "center" }}
              />
              <Typography variant="h5" textAlign='center'>{doc.name}</Typography>
              <Typography
                variant="body1"
                fontFamily='sans-serif'
                fontSize={spacing(2)}
                textAlign='center'
              >
                {doc.speciality}
              </Typography>
              <Typography
                variant="body1"
                fontFamily='sans-serif'
                fontSize={spacing(2)}
              >
                <LocationOnIcon style={{ marginRight: spacing(2), marginTop: spacing(2) }} />
                {doc.clinicAddress}
              </Typography>
              <Typography
                variant="body1"
                fontFamily='sans-serif'
                fontSize={spacing(2)}
              >
                <AccessTimeIcon style={{ marginRight: spacing(2), marginTop: spacing(2) }} />
                {doc.appointments.days.join(', ')}
              </Typography>
              <Typography
                variant="body1"
                fontFamily='sans-serif'
                fontSize={spacing(2)}
                style={{ marginLeft: spacing(5) }}
              >
                {`from ${doc.appointments.from} to ${doc.appointments.to}`}
              </Typography>
            </Paper>
          ))}
        </div>
      </section>
    </>
  );
};

export default Home;