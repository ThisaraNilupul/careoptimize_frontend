import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from '../../../components/BaseCard-component/Card';
import './PatientNotification.css'

function PatientNotification() {
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
    }, [userID]);

  return (
    <div className='patientNotifications'>
        <div className='searchbar-container'>
            <div>Notifications</div>
            <div>
                
            </div>
        </div>
        <Card width="81vw" height="78vh">
        
        </Card>
    </div>
    // <div>
    //   <h3>Notifications</h3>
    //         <ul>
    //             {notifications.map((notification, index) => (
    //                 <li key={index}>
    //                     {notification.message} - {new Date(notification.date).toLocaleString()}
    //                 </li>
    //             ))}
    //         </ul>
    // </div>
  )
}

export default PatientNotification;
