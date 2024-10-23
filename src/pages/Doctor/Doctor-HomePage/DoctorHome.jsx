import React, { useEffect, useState } from 'react';
import './DoctorHome.css';
import {ReactComponent as DoctorHomeSvg} from "../../../assets/doctorHome.svg";
import Card from '../../../components/BaseCard-component/Card';
import HomeCard from '../../../components/BaseCard-component/HomeCard';

function DoctorHome() {
  const doctorID = localStorage.getItem('userId');
  const firstName = localStorage.getItem('firstName');
  const lastName = localStorage.getItem('lastName');
  const [greeting, setGreeting] = useState('');

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

  return (
    <div>
      <div className='section-one'>
        <div className='welcome-card'>
          <div className='wlcomecontent'>
              <div className='welcome-Wish'>{greeting}</div>
              <div className='welcome-name'>Dr. {firstName} {lastName}</div>
          </div>
          <div className='svg'>
            <DoctorHomeSvg width="29vw" height="30vh" className="custom-svg" />
          </div>
        </div>
        <HomeCard width="24vw" height="30vh" ></HomeCard>
      </div>
      <div className='section-two'>
        <div className='two-partone'>
          <HomeCard width="15vw" height="20vh" ></HomeCard>
          <HomeCard width="15vw" height="20vh" ></HomeCard>
          <HomeCard width="15vw" height="20vh" ></HomeCard>
          <HomeCard width="15vw" height="20vh" ></HomeCard>
          <HomeCard width="15vw" height="20vh" ></HomeCard>
        </div>
        <div className='two-parttwo'>
          <HomeCard width="80vw" height="29vh" ></HomeCard>
        </div>
      </div>
    </div>
  )
}

export default DoctorHome;
