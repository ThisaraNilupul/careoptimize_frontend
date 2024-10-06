import React from 'react';
import { CiBellOn } from "react-icons/ci";
import './MainHeader.css';

const MainHeader = ({location, firstname, lastname}) => {
  return (
    <div className='mainheader'>
      <div className='mainheader-left'>
        <h2>{location}</h2>
      </div>
      <div className='mainheader-right'>
        <span>{firstname} {lastname}</span> 
        <img className='profile-pic' src=' ' alt=' ' />
        <i className="notification-icon"><CiBellOn /> </i> 
        </div> 
    </div>
  );
}

export default MainHeader;