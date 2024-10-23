import React from 'react';
import PatientHome from '../pages/Patient/Patient-HomePage/PatientHome';
import LoginPage from '../pages/LogingPage/LogingPage';
import RegisterPage from '../pages/RegisterPage/RegisterPage';
import PatientAppointment from '../pages/Patient/Patient-AppointmentPage/PatientAppointment';
import PatientCalendar from '../pages/Patient/Patient-CalendarPage/PatientCalendar';
import PatientOngoingTreatment from '../pages/Patient/Patient-OngoingTreatmentPage/PatientOngoingTreatment';
import PatientProfile from '../pages/Patient/Patient-ProfilePage/PatientProfile';
import DoctorProfile from '../pages/Doctor/Doctor-ProfilePage/DoctorProfile';
import DoctorHome from '../pages/Doctor/Doctor-HomePage/DoctorHome';
import DoctorAddTreatment from '../pages/Doctor/Doctor-AddTreatmentPage/DoctorAddTreatment';
import PatientsOverView from '../pages/Doctor/Doctor-PatientsOverView/PatientsOverView';
import PatientNotification from '../pages/Patient/Patient-NotificationPage/PatientNotification';
import PatientMedicalHistory from '../pages/Patient/Patient-MedicalHistoryPage/PatientMedicalHistory';
import LandingPage from '../components/Landing-component/LandingPage';
import DoctorNotifications from '../pages/Doctor/Doctor-NotificationPage/DoctorNotifications';

export const AppRoutes = [
  //patient routes
  { path: '/login', component: <LoginPage /> },
  { path: '/signup', component: <RegisterPage /> },
  { path: '/landing', component: <LandingPage />},
  { path: '/patient/home', component: <PatientHome /> },
  { path: '/patient/appointments', component: <PatientAppointment /> },
  { path: '/patient/ongoing-treatment', component: <PatientOngoingTreatment /> },
  { path: '/patient/medical-history', component: <PatientMedicalHistory /> },
  { path: '/patient/notifications', component: <PatientNotification /> },
  { path: '/patient/calendar', component: <PatientCalendar /> },
  { path: '/patient/profile', component: <PatientProfile />},

  //doctor routes
  { path: '/doctor/profile', component: <DoctorProfile />},
  { path: '/doctor/landing', component: <DoctorHome />},
  { path: '/doctor/add-treatment', component: <DoctorAddTreatment />},
  { path: '/doctor/notifications', component: <DoctorNotifications /> },
  { path: '/doctor/patients-over-view', component: <PatientsOverView />}
];