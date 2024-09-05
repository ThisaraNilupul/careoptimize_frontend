import React from 'react';
import './MainHeader.css';

const MainHeader = () => {
  return (
    <div className='mainheader'>
      <div className='mainheader-left'>
        <h2>Home</h2>
      </div>
      <div className='mainheader-right'>
        <span>[Patient Name]</span> 
        <img className='profile-pic' src='/path-to-profile-pic.jpg' alt='Profile' />
        <i className="notification-icon">🔔</i> 
        </div> 
    </div>
  );
}

export default MainHeader;