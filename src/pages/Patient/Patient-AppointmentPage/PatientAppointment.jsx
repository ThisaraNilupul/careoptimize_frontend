import React from 'react';
import Button from '../../../components/BaseButton-component/Button';
import Card from '../../../components/BaseCard-component/Card';
import './PatientAppointment.css';

function PatientAppointment() {
  return (
    <div className='patientAppointment'>
      <Button text="Add New Appointment" height="40px" width="300px" />
      <Card width="100%" height="30%">
        <h2>Upcoming Appointments</h2>
        <p>List of scheduled appointments with details like date, time, doctor’s name, and department.</p>
        <p>Action Button: "Cancel" or "Reschedule" for each appointment.</p>
      </Card>
      <Card width="100%" height="30%">
        <h2>Appointment History:</h2>
        <p>List of past appointments with brief summaries.</p>
      </Card>
    </div>
  )
}

export default PatientAppointment
