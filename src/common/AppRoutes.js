import React from 'react';
import PatientHome from '../pages/Patient/Patient-HomePage/PatientHome';
import LoginPage from '../pages/LogingPage/LogingPage';
import RegisterPage from '../pages/RegisterPage/RegisterPage';
import PatientAppointment from '../pages/Patient/Patient-AppointmentPage/PatientAppointment';
import PatientCalendar from '../pages/Patient/Patient-CalendarPage/PatientCalendar';
import PatientOngoingTreatment from '../pages/Patient/Patient-OngoingTreatmentPage/PatientOngoingTreatment';

export const AppRoutes = [
  { path: '/login', component: <LoginPage /> },
  { path: '/signup', component: <RegisterPage /> },
  { path: '/patient/home', component: <PatientHome /> },
  { path: '/patient/appointments', component: <PatientAppointment /> },
  { path: '/patient/ongoing-treatment', component: <PatientOngoingTreatment /> },
//   { path: '/patient/notifications', component: <PatientNotifications /> },
  { path: '/patient/calendar', component: <PatientCalendar /> },
//   { path: '/patient/emergency', component: <PatientEmergency /> },
];