import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { CiBellOn, CiUser } from "react-icons/ci";
import './MainHeader.css';

const MainHeader = ({location, firstname, lastname}) => {
  const userID = localStorage.getItem('userId');
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/patient/notifications/${userID}`);
            setNotifications(response.data);
        } catch (error) {
            console.error('Error fetching notifications:', error);
        }
    };

    fetchNotifications();
  }, [location]);

  const getUnreadCount = (category) => {
    if (category === 'All') {
        return notifications.filter(notification => !notification.read).length;
    }
  };

  const getPageTitle = (location) => {
    const pageTitles = {
      '/patient/home': 'Home',
      '/patient/appointments': 'Appointments',
      '/patient/ongoing-treatment': 'Ongoing Treatments',
      '/patient/notifications' : 'Notifications',
      '/patient/medical-history' : 'Medical History',
      '/patient/calendar' : 'Calendar',
      '/patient/profile' : 'Profile',
      '/doctor/home': 'Home',
      '/doctor/patients-over-view' : "Patient's Over View",
      '/doctor/add-treatment' : 'Shedule Treatments',
      '/doctor/profile' : 'Profile',
    };
    return pageTitles[location] || '';
  }


  return (
    <div className='mainheader'>
      <div className='mainheader-left'>
        <h2>{getPageTitle(location)}</h2>
      </div>
      <div className='mainheader-right'>
        <span className='username'>{firstname} {lastname}</span> 
        <div className='profile-pic'>{React.cloneElement(<CiUser />, { size: 24, color: "#333", })}</div>
        {getUnreadCount('All') > 0 && (
          <span className='unread-count'>{getUnreadCount('All') > 0 && `${getUnreadCount('All')}`}</span>
        )}
        <i className="notification-icon">{React.cloneElement(<CiBellOn />, { size: 29, color: "#333", })}</i> 
      </div> 
    </div>
  );
}

export default MainHeader;