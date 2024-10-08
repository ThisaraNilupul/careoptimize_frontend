import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { CiHome, CiCircleList, CiViewList, CiBellOn, CiCalendar, CiMedicalCross, CiUser, CiPillsBottle1 } from "react-icons/ci";
import Sidenav from "./components/Sidenav-component/Sidenav";
import MainHeader from './components/MainHeader-component/MainHeader';
import { AppRoutes } from './common/AppRoutes';
import './App.css';


function App() {
  const location = useLocation();
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    const role = localStorage.getItem('role');
    const firstName = localStorage.getItem('firstName');
    const lastName = localStorage.getItem('lastName');
    setFirstname(firstName);
    setLastname(lastName);

    if (role === 'P') {
      setMenuItems([
        { name: 'Home', path: '/patient/home', icon: <CiHome /> },
        { name: 'Appointments', path: '/patient/appointments', icon: <CiCircleList /> },
        { name: 'Ongoing Treatment', path: '/patient/ongoing-treatment', icon: <CiPillsBottle1 /> },
        { name: 'Medical History', path: '/patient/medical-history', icon: <CiViewList /> },
        { name: 'Notifications', path: '/patient/notifications', icon: <CiBellOn /> },
        { name: 'Calendar', path: '/patient/calendar', icon: <CiCalendar /> },
        { name: 'Emergency', path: '/patient/emergency', icon: <CiMedicalCross /> },
        { name: 'Profile', path: '/patient/profile', icon: <CiUser /> },
      ]);
    } else if (role === 'D') {
      setMenuItems([
        { name: 'Home', path: '/doctor/home', icon: <CiHome /> },
        { name: 'Schedule-Treatments', path: '/doctor/add-treatment', icon: <CiPillsBottle1 /> },
        { name: 'Profile', path: '/doctor/profile', icon: <CiUser /> },
      ])
    } else if (role === 'S') {
      // Add Staff-specific routes here
    }
  }, [location]);

  const shouldShowSidebar = () => {
    const { pathname } = location;
    return !['/login', '/signup'].includes(pathname);
  };

  const isAuthPage = () => {
    const { pathname } = location;
    return ['/login', '/signup'].includes(pathname);
  };

  return (
    <div className={isAuthPage() ? 'auth-container' : 'app-container'}>
      {shouldShowSidebar() && <Sidenav menu={menuItems} />}
      <div className='main-layout'>
        {!isAuthPage() && <MainHeader location={location.pathname} firstname={firstname} lastname={lastname} />}
        <div className={isAuthPage() ? 'auth-content' : 'content'}>
          <Routes>
            {AppRoutes.map((route, i) => (
              <Route key={i} path={route.path} element={route.component} />
            ))}
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default function WrappedApp() {
  return (
    <Router>
      <App />
    </Router>
  );
}
