import React from 'react';
import Card from '../../../components/BaseCard-component/Card';
import './PatientHome.css';

function PatientHome() {
  return (
    <div className='patientHome'>
      <Card width="70%" height="30%">
        <h2>Hello, [Patient Name]!</h2>
        <p>A brief notification or update summary.</p>
        <button>View all</button>
      </Card>
      <Card width="28%" height="30%">
        <h2>Calendar</h2>
        <p>Display the current month with highlighted appointment dates.</p>
      </Card>
      <Card width="70%" height="30%">
        <h2>Next Appointment Details</h2>
      </Card>
      <Card width="28%" height="30%">
        <h2>Emergency</h2>
        <p>Emergency Contacts</p>
      </Card>
      <Card width="70%" height="30%">
        <h2>Latest Medical Updates or Metrics</h2>
        <p>(e.g., blood pressure, weight)</p>
      </Card>
    </div>
  )
}

export default PatientHome
