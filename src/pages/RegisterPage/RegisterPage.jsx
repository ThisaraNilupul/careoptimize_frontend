import React, {useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './RegisterPage.css';
import LoadingLeft from '../../components/loading-left-component/LoadingLeft';
import Notification from '../../components/AlertNotification-component/Notification';

function RegisterPage() {
  const [role, setRole] = useState('patient');
  const [formData, setFormData] = useState({
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
    username: '', 
    password: ''
  });
  const [notification, setNotification] = useState(null);
  const navigate = useNavigate();

  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };

  const { firstName,
          lastName, 
          addressNo,
          street,
          city,
          province,
          nic, 
          phoneNumber, 
          email, 
          birthday,
          gender,
          username, 
          password } = formData;

  const onChange = (e) => setFormData({...formData, [e.target.name]: e.target.value});
  console.log('formdata', formData);



  const handleSubmit = async (e) => {
      e.preventDefault();

      try{
        const response = await axios.post('http://localhost:5000/api/patient/register', 
          {
            firstName,
            lastName, 
            addressNo,
            street,
            city,
            province,
            nic, 
            phoneNumber, 
            email, 
            birthday,
            gender,
            username, 
            password
          });
          console.log('response', response);
          const {token} = response.data;
          localStorage.setItem('token', token);
          setNotification({
            status: 'success',
            message: response.data.msg || 'Registration successful',
            backgroundColor: 'rgba(117, 248, 132, 1)',
          })
          setTimeout(() => {
            navigate('/login');
          }, 500);
      } catch (error) {
        let errorMessage = 'An error occurred. Please try again.';
    
        if (error.response) {
          if (error.response.data && error.response.data.error) {
            // If it's an array of errors, take the first one
            errorMessage = error.response.data.error[0]?.msg || errorMessage;
          } else if (typeof error.response.data === 'string') {
            // If it's a string message, use it directly
            errorMessage = error.response.data;
          }
        }

        setNotification({
          status: 'failed',
          message: errorMessage,  // Ensure this is a string
          backgroundColor: 'rgba(248, 117, 117, 1)',
        });
      }
  }

  const closeNotification = () => {
    setNotification(null);
  };

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
            <form onSubmit={handleSubmit} className='baseForm'>
                <div className="scrollable-container">
                  <input type='text' name='firstName' value={firstName} onChange={onChange} placeholder='First name' required/>
                  <input type='text' name='lastName' value={lastName} onChange={onChange} placeholder='Last name' required/>
                  <input type='text' name='addressNo' value={addressNo} onChange={onChange} placeholder='AddressNo'required/>
                  <input type='text' name='street' value={street} onChange={onChange} placeholder='Street' required/>
                  <input type='text' name='city' value={city} onChange={onChange} placeholder='City' required/>
                  <input type='text' name='province' value={ province} onChange={onChange} placeholder='Province' required/>
                  <input type='text' name='nic' value={nic} onChange={onChange} placeholder='NIC' required/>
                  <input type='text' name='phoneNumber' value={phoneNumber} onChange={onChange} placeholder='PhoneNo' required/>
                  <input type='text' name='email' value={email} onChange={onChange} placeholder='Email' required/>
                  <input type='date' name='birthday' value={birthday} onChange={onChange} placeholder='Birthday' required/>
                  <input type='text' name='gender' value={gender} onChange={onChange} placeholder='Gender' required/>
                  <input type='text' name='username' value={username} onChange={onChange} placeholder='Username' required/>
                  <input type='password' name='password' value={password} onChange={onChange} placeholder='Password' required/>  
                </div>    
                <button type="submit">Register</button>
            </form>
            <div className='Registerpagelinks'>
              <p>allready have an account</p>
              <a href='/login'>Log in</a>
            </div>
        </div>
        {notification && (
        <Notification 
            status={notification.status}
            message={notification.message}
            height={notification.height}
            width={notification.width}
            backgroundColor={notification.backgroundColor}
            onClose={closeNotification}
        />
      )}
    </div>
  )
}

export default RegisterPage;
