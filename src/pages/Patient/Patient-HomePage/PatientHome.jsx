import React, { useEffect, useState } from 'react';
import axios from 'axios';
import HomeCard from '../../../components/BaseCard-component/HomeCard';
import {ReactComponent as DoctorHomeSvg} from "../../../assets/doctorHome.svg";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import './PatientHome.css';
import { green, yellow, red, lightBlue } from '@mui/material/colors';

const yellowHover = yellow[100];
const redHover = red[100];
const greenHover = green[100];
const lightBlueHover = lightBlue[100];

function PatientHome() {
  const userID = localStorage.getItem('userId');
  const firstName = localStorage.getItem('firstName');
  const lastName = localStorage.getItem('lastName');
  const [greeting, setGreeting] = useState('');
  const [notifications, setNotifications] = useState([]);
  const [unreadnotifications, setunreadNotifications] = useState([]);
  const [allOnGoingTreatments, setAllOnGoingTreatments] = useState([]);
  const [patinerProfileData, setPatientProfileData] = useState({
    firstName: '',
    lastName: '',
    addressNo: '',
    street: '',
    city: '',
    province: '',
    nic: '',
    phoneNumber: '',
    email: '',
    birthday: '',
    gender: '',
    biodata: '',
    healthIssues: [],
    relatives: []
});

  const getGreeting = () => {
    const currentHour = new Date().getHours();

    if (currentHour >= 0 && currentHour < 4) {
      return "Good mid night !"
    } else if (currentHour < 12) {
      return "Good Morning !"
    } else if (currentHour >= 12 && currentHour < 15) {
      return "Good Afternoon";
    } else if (currentHour >= 15 && currentHour < 19 ) {
      return "Good Evening"; 
    } else {
      return "Good Night";
    }
  }

  useEffect(() => {
    setGreeting(getGreeting());
  }, []);

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
  }, [ ]);

  const getUnreadCount = (category) => {
    if (category === 'All') {
        return notifications.filter(notification => !notification.read).length;
    }
  };

  useEffect(() => {
    fetch(`http://localhost:5000/api/patient/profile/${userID}`,{
        method: "GET",
        headers: {'content-type': 'application/json'}
    })
    .then((res) => res.json())
    .then((data) => {
        console.log('patientdata', data);
        setPatientProfileData((prevState) => ({
            ...prevState,
            ...data
        }));
        console.log('patient', patinerProfileData);
    })
    .catch((error => { console.log(error) }));
  }, [notifications]); 


  const bmical = (height, weight) => {
    const heightM = height / 100;
    const bmi = weight / (heightM * heightM);
    return bmi.toFixed(2);
  }

  const bmiresult = (bmivalue) => {
    if (bmivalue <= 18.50){
      return "Underweight";
    } else if (bmivalue > 18.50 && bmivalue <= 25.00){
      return "Healthy weight";
    } else if (bmivalue > 25.00 && bmivalue <= 30.00){
      return "At risk of overweight";
    } else if (bmivalue > 30.00) {
      return "Overweight";
    }
  }

  useEffect(() => {
    fetch(`http://localhost:5000/api/doctor/treatments/${userID}`)
    .then((res) => res.json())
    .then((data) => {
      setAllOnGoingTreatments(data);
    })
    .catch((error) => {
      console.log(error);
    });
  }, []);

  const getCounttreatments = () => {
    return allOnGoingTreatments.length;
  }


  const fetchNotifications = async () => {
    try {
        const response = await axios.get(`http://localhost:5000/api/patient//notifications/unread/${userID}`);
        setunreadNotifications(response.data);
    } catch (error) {
        console.error('Error fetching notifications:', error);
    }
  };

  useEffect(() => {
      fetchNotifications();
  }, []);

  return (
    <div>
      <div className='patient-section-one'>
        <div>
          <div className='pwelcome-card'>
            <div className='pwlcomecontent'>
                <div className='pwelcome-Wish'>{greeting}</div>
                <div className='pwelcome-name'>{firstName} {lastName}</div>
                <div className='notification-count'>
                {getUnreadCount('All') > 0 && (
                    <span >You have {getUnreadCount('All') > 0 && `${getUnreadCount('All')}`} Unread Notifications.</span>
                )}
                </div>
            </div>
            <div className='svg'>
              <DoctorHomeSvg width="24vw" height="25vh" className="custom-svg" />
            </div>
          </div>
          <div className='smallcards'>
            <HomeCard width="18vw" height="20vh" backgroundColor={redHover}>
              <div className='bloodtype'>Blood Type</div>
              <div className='bloodtype-value'>{patinerProfileData.biodata.bloodType}</div>
            </HomeCard>
            <HomeCard width="18vw" height="20vh" backgroundColor={yellowHover} >
              <div className='biodata-content'>
                <div className='biodata'>My Height :</div>
                <div className='biodatavalue'>{patinerProfileData.biodata.height} cm</div>
              </div>
              <div className='biodata-content'>
                <div className='biodata'>My Weight :</div>
                <div className='biodatavalue'>{patinerProfileData.biodata.weight} kg</div>
              </div>
            </HomeCard>
            <HomeCard width="17vw" height="20vh" backgroundColor={greenHover} >
              <div className='bmi'>BMI Value</div>
              <div className='bmivalue'>{bmical(patinerProfileData.biodata.height, patinerProfileData.biodata.weight)} kg/m2</div>
              <div className='bmiresult'>{bmiresult(bmical(patinerProfileData.biodata.height, patinerProfileData.biodata.weight))}</div>
            </HomeCard>
          </div>
        </div>
        <HomeCard width="23vw" height="46vh" backgroundColor="">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateCalendar />
          </LocalizationProvider>
        </HomeCard>
      </div>
      <div className='patient-section-two'>
        <div className='ptwo-parttwo'>
          <HomeCard width="81vw" height="35vh" backgroundColor={lightBlueHover}>
                <div className='ongoingtreatment'>
                  <div className='ongoingtreatment-title'>Current Ongoing Treatments status</div>
                {allOnGoingTreatments.length > 0 ? (
                  <div className='ongoingtreatment-value'>There are {getCounttreatments} ongoing treatments at the moment. go and checkout the ongoing treatment page.</div>
                ) : (
                  <div className='ongoingtreatment-value'>There are no ongoing treatments at the moment. Please check back later or consult with your healthcare provider for further updates.</div>
                )}
                </div>
                <div className='unreadnotification'>
                  <div className='unreadnotification-title'>Unread Notifications</div>
                  <div className='unreadnotification-content'>
                    {unreadnotifications.length > 0 ? (
                        unreadnotifications.map((notification) => (
                            <div key={notification._id} className='unreadnotification-item'>
                                <p className='unreadnotification-meaasge'><strong>Message:</strong> {notification.message}</p>
                                <p className='unreadnotification-date'><strong>Date:</strong> {new Date(notification.date).toLocaleString()}</p>
                            </div>
                        ))
                    ) : (
                        <p>No unread notifications.</p>
                    )}
                  </div>
                </div>
          </HomeCard>
        </div>
      </div>
    </div>
  )
}

export default PatientHome
