import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from '../../../components/BaseCard-component/Card';
import { CiMail, CiChat1, CiBellOn, CiMedicalClipboard, CiSettings } from "react-icons/ci";
import './PatientNotification.css'
import ButtonMain from '../../../components/BaseButton-component/Button';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import CachedIcon from '@mui/icons-material/Cached';
import { green, yellow, red } from '@mui/material/colors';

const redMain = red.A400;
const redHover = red.A700;
const greenMain = green.A400;
const greenHover = green.A700;
const yellowMain = yellow.A400;
const yellowHover = yellow.A700;

function PatientNotification() {
    const userID = localStorage.getItem('userId');
    const [notifications, setNotifications] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('All');

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
    }, []);

    const markAsRead = async (notificationId) => {
        try{
            await axios.patch(`http://localhost:5000/api/patient/notification/${notificationId}`, { read: true });
            setNotifications(prevNotifications => 
                prevNotifications.map(notification => 
                    notification._id === notificationId ? {...notification, read: true } : notification
                )
            );
        } catch (error) {
            console.error('Error marking as read:', error);
        }
    }

    const getUnreadCount = (category) => {
        if (category === 'All') {
            return notifications.filter(notifications => !notifications.read).length;
        } else {
            return notifications.filter(notifications => !notifications.read && notifications.category === category).length;
        }
    }

    const handleCategoryClick = (category) => {
        setSelectedCategory(category);
    }

    const filteredNotifications = notifications.filter(notification => {
        return selectedCategory === 'All' || notification.category === selectedCategory;
    });

  return (
    <div className='patientNotifications'>
        <div className='searchbar-container'>
            <div className='searchbar-button'>
                <ButtonMain text="Apply Filter" height="28px" width="200px" variant="contained" color="#000000" bgColor={greenMain} bgHoverColor={greenHover} icon={<FilterAltIcon />}/>
                <ButtonMain text="Refresh" height="28px" width="200px" variant="contained" color="#000000" bgColor={yellowMain} bgHoverColor={yellowHover} icon={<CachedIcon />}/>
            </div>
        </div>
        <Card width="81vw" height="78vh">
            <div className='cardnotification'> 
                <div className='category-bar'>
                    <div className={`categoryItem ${selectedCategory === 'All' ? 'active-category' : ''}`} onClick={() => handleCategoryClick('All')}>
                        <span className="icon"> {React.cloneElement(<CiMail />, { size: 19, color: "#333", })}</span>
                        <span className="item-name">All</span>
                        {getUnreadCount('All') > 0 && (
                            <span className='all-count'>{getUnreadCount('All') > 0 && `${getUnreadCount('All')} new`}</span>
                        )}
                    </div>
                    <div className={`categoryItem ${selectedCategory === 'Genaral' ? 'active-category' : ''}`} onClick={() => handleCategoryClick('Genaral')}>
                        <span className="icon"> {React.cloneElement(<CiChat1 />, { size: 19, color: "#333", })}</span>
                        <span className="item-name">Genaral</span>
                        {getUnreadCount('Genaral') > 0 && (
                            <span className='genaral-count'>{getUnreadCount('Genaral') > 0 && `${getUnreadCount('Genaral')} new`}</span>
                        )}
                    </div >
                    <div className={`categoryItem ${selectedCategory === 'Treatment' ? 'active-category' : ''}`} onClick={() => handleCategoryClick('Treatment')}>
                        <span className="icon"> {React.cloneElement(<CiBellOn />, { size: 19, color: "#333", })}</span>
                        <span className="item-name">Treatment</span>
                        {getUnreadCount('Treatment') > 0 && (
                            <span className='treatment-count'>{getUnreadCount('Treatment') > 0 && `${getUnreadCount('Treatment')} new`}</span>
                        )}
                    </div>
                    <div className={`categoryItem ${selectedCategory === 'Checkup' ? 'active-category' : ''}`} onClick={() => handleCategoryClick('Checkup')}>
                        <span className="icon"> {React.cloneElement(<CiMedicalClipboard />, { size: 19, color: "#333", })}</span>
                        <span className="item-name">Checkup</span>
                        {getUnreadCount('Checkup') > 0 && (
                            <span className='checkup-count'>{getUnreadCount('Checkup') > 0 && `${getUnreadCount('Checkup')} new`}</span>
                        )}
                    </div>
                    <div className={`categoryItem ${selectedCategory === 'System' ? 'active-category' : ''}`} onClick={() => handleCategoryClick('System')}>
                        <span className="icon"> {React.cloneElement(<CiSettings />, { size: 19, color: "#333", })}</span>
                        <span className="item-name">System</span>
                        {getUnreadCount('System') > 0 && (
                            <span className='system-count'>{getUnreadCount('System') > 0 && `${getUnreadCount('System')} new`}</span>
                        )}
                    </div>
                </div>
                <div className='notificationContainer'>
                    <div className='header-content'>
                        <div className='message'>Message</div>
                        <div className='datetime'>Date & Time</div>
                        <div className='read'>Mark</div>
                    </div>
                    <div className='notification-content'>
                        {filteredNotifications.map((notification, index) => (
                            <div key={index} className='notification' style={{ 

                                backgroundColor: notification.read ? "rgba(214, 213, 213, 0.208)" : (notification.category === "Genaral" ? "rgba(4, 0, 227, 0.208)" : 
                                notification.category === "Treatment" ? "rgba(227, 136, 0, 0.208)" :
                                notification.category === "Checkup" ? "rgba(227, 0, 42, 0.208)" :
                                notification.category === "System" ? "rgba(58, 56, 53, 0.208)" : "transparent")
                            }} >
                                <div className='n-message'>{notification.message}</div>
                                <div className='n-datetime'>{new Date(notification.date).toLocaleString()}</div>
                                <div className='n-read'>{notification.read ? "Read" : "Unread"}</div>
                                <input type='checkbox' onChange={() => markAsRead(notification._id)} checked={notification.read} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>       
        </Card>
    </div>
  )
}

export default PatientNotification;
