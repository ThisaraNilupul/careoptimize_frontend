import React from 'react';
import Card from '../../../components/BaseCard-component/Card';
import './PatientProfile.css';

function PatientProfile() {
  return (
    <div className='patient-profile-container'>
        <Card width="40%" height="100%">
            <div className='card-title'>Personal info</div>
            <div className='card-content'>
                <div className='content-item'>
                    <div className='item-name'>Name</div>
                    <div className='item-value'></div>
                </div>
                <div className='content-item'>
                    <div className='item-name'>Address</div>
                    <div className='item-value'></div>
                </div>
                <div className='content-item'>
                    <div className='item-name'>NIC</div>
                    <div className='item-value'></div>
                </div>
                <div className='content-item'>
                    <div className='item-name'>Phone No</div>
                    <div className='item-value'></div>
                </div>
                <div className='content-item'>
                    <div className='item-name'>email</div>
                    <div className='item-value'></div>
                </div>
                <div className='content-item'>
                    <div className='item-name'>Birthday</div>
                    <div className='item-value'></div>
                </div>
                <div className='content-item'>
                    <div className='item-name'>Gender</div>
                    <div className='item-value'></div>
                </div>
            </div>
        </Card>
   </div>
  )
}

export default PatientProfile;
