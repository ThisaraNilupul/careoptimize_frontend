import React from 'react';
import PatientHome from '../pages/Patient/Patient-HomePage/PatientHome';
// import PatientAppointments from '../Pages/PatientAppointments';
// import PatientMedicalHistory from '../Pages/PatientMedicalHistory';
// import PatientNotifications from '../Pages/PatientNotifications';
// import PatientCalendar from '../Pages/PatientCalendar';
// import PatientEmergency from '../Pages/PatientEmergency';
import LoginPage from '../pages/LogingPage/LogingPage';
import RegisterPage from '../pages/RegisterPage/RegisterPage';

export const AppRoutes = [
  { path: '/Login', component: <LoginPage /> },
  { path: '/signup', component: <RegisterPage /> },
  { path: '/patient/home', component: <PatientHome /> },
//   { path: '/patient/appointments', component: <PatientAppointments /> },
//   { path: '/patient/medical-history', component: <PatientMedicalHistory /> },
//   { path: '/patient/notifications', component: <PatientNotifications /> },
//   { path: '/patient/calendar', component: <PatientCalendar /> },
//   { path: '/patient/emergency', component: <PatientEmergency /> },
];