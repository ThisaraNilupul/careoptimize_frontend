import React from 'react';
import Button from '../../../components/BaseButton-component/Button';
import './PatientOngoingTreatment.css';


function PatientOngoingTreatment() {
  return (
    <div className='patient-OngoingTreatment-container'>
      <Button text="New Treatment" height="40px" width="300px" className="add-event-button" />
    </div>
  )
}

export default PatientOngoingTreatment
