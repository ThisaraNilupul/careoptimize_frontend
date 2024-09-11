import React, {useState} from 'react';
import './RegisterPage.css';
import LoadingLeft from '../../components/loading-left-component/LoadingLeft';
import BaseForm from '../../components/BaseForm-component/BaseForm';

function RegisterPage() {
  const [role, setRole] = useState('patient');

  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };

  const getField = () => {
    switch (role) {
      case 'doctor':
        return [
          { label: 'First Name', type: 'text', placeholder: 'First Name' },
          { label: 'Last Name', type: 'text', placeholder: 'Last Name' },
          { label: 'Specialty', type: 'text', placeholder: 'Specialty' },
          { label: 'Phone Number', type: 'text', placeholder: 'Phone Number' },
          { label: 'Email', type: 'email', placeholder: 'Email' },
          { label: 'Department', type: 'text', placeholder: 'Department' },
          { label: 'Years of Experience', type: 'number', placeholder: 'Years of Experience' },
          { label: 'License Number', type: 'text', placeholder: 'License Number' },
          { label: 'Consultation Hours', type: 'text', placeholder: 'Consultation Hours' },
          { label: 'Room Number', type: 'text', placeholder: 'Room Number' },
          { label: 'User Name', type: 'text', placeholder: 'Username'},
          { label: 'Password', type: 'password', placeholder: 'Password'},
        ];

      case 'staff':
        return [
          { label: 'First Name', type: 'text', placeholder: 'First Name' },
          { label: 'Last Name', type: 'text', placeholder: 'Last Name' },
          { label: 'Role', type: 'text', placeholder: 'Role' },
          { label: 'Phone Number', type: 'text', placeholder: 'Phone Number' },
          { label: 'Email', type: 'email', placeholder: 'Email' },
          { label: 'Department', type: 'text', placeholder: 'Department' },
          { label: 'Employment Date', type: 'date', placeholder: 'Employment Date' },
          { label: 'Shift', type: 'text', placeholder: 'Shift' },
          { label: 'Supervisor ID', type: 'text', placeholder: 'Supervisor ID' },
          { label: 'User Name', type: 'text', placeholder: 'Username'},
          { label: 'Password', type: 'password', placeholder: 'Password'},
        ];  

      case 'patient':
      default:
        return [
          { label: 'First Name', type: 'text', placeholder: 'First Name' },
          { label: 'Last Name', type: 'text', placeholder: 'Last Name' },
          { label: 'Date of Birth', type: 'date', placeholder: 'Date of Birth' },
          { label: 'Gender', type: 'text', placeholder: 'Gender' },
          { label: 'Address', type: 'text', placeholder: 'Address' },
          { label: 'Phone Number', type: 'text', placeholder: 'Phone Number' },
          { label: 'Email', type: 'email', placeholder: 'Email' },
          { label: 'Medical History', type: 'text', placeholder: 'Medical History' },
          { label: 'Allergies', type: 'text', placeholder: 'Allergies' },
          { label: 'Blood Type', type: 'text', placeholder: 'Blood Type' },
          { label: 'Emergency Contact Name', type: 'text', placeholder: 'Emergency Contact Name' },
          { label: 'Emergency Contact Phone', type: 'text', placeholder: 'Emergency Contact Phone' },
          { label: 'Insurance Provider', type: 'text', placeholder: 'Insurance Provider' },
          { label: 'Insurance Policy Number', type: 'text', placeholder: 'Insurance Policy Number' },
          { label: 'User Name', type: 'text', placeholder: 'Username'},
          { label: 'Password', type: 'password', placeholder: 'Password'},
        ];
    }
  };

  const handleSubmit = (e) => {
      e.preventDefault();
  }

  return (
    <div className='Register-page'>
        <div className='Registerpage-leftside'>
            <LoadingLeft />
        </div>
        <div className='Registerpage-rightside'>
            <div className='registerheading-1'>Register</div>
            <div className='registerheading-2'>Select role</div>
            <select value={role} onChange={handleRoleChange}>
              <option value="patient">Patient</option>
              <option value="doctor">Doctor</option>
              <option value="staff">Staff</option>
            </select>
            <BaseForm fields={getField()} onSubmit={handleSubmit} />
            <div className='Registerpagelinks'>
              <p>allready have an account</p>
              <a href='/login'>Log in</a>
            </div>
        </div>
    </div>
  )
}

export default RegisterPage;
