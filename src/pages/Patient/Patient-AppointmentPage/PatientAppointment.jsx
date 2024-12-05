import React from 'react';
import ButtonMain from '../../../components/BaseButton-component/Button';
import Card from '../../../components/BaseCard-component/Card';
import './PatientAppointment.css';
import { green } from '@mui/material/colors';
import AddIcon from '@mui/icons-material/Add';

const greenMain = green.A400;
const greenHover = green.A700;

function PatientAppointment() {
  return (
    <div className='patientAppointment'>
      <ButtonMain text="Add New Appointment" height="28px" width="280px" variant="contained" color="#000000" bgColor={greenMain} bgHoverColor={greenHover} icon={<AddIcon />}/>
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
