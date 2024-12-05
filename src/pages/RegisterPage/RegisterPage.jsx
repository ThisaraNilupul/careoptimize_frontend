import React, {useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './RegisterPage.css';
import ButtonMain from '../../components/BaseButton-component/Button';
import LoadingLeft from '../../components/loading-left-component/LoadingLeft';
import Notification from '../../components/AlertNotification-component/Notification';
import { green} from '@mui/material/colors';

const greenMain = green.A400;
const greenHover = green.A700;

function RegisterPage() {
  const [roleV, setRoleV] = useState('P');
  const [formData, setFormData] = useState({
    role: 'P',
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
    setRoleV(e.target.value);
    setFormData({...formData, role: e.target.value});
  };

  const { role,
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
          password } = formData;

  const onChange = (e) => setFormData({...formData, [e.target.name]: e.target.value});
  console.log('formdata', formData);



  const handleSubmit = async (e) => {
      e.preventDefault();

      try{
        const response = await axios.post('http://localhost:5000/api/register', formData);
          console.log('response', response);
          const {token} = response.data;
          localStorage.setItem('token', token);
          localStorage.setItem('email', formData.email);
          setNotification({
            status: 'success',
            message: response.data.msg || 'Registration successful',
            backgroundColor: 'rgba(117, 248, 132, 1)',
          })
          setTimeout(() => {
            navigate('/verify');
          }, 1000);
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
            <form onSubmit={handleSubmit} className='baseForm'>
                <div className="scrollable-container">
                  <div className='items'>
                    <label>Select User Role</label>
                    <select value={role} onChange={handleRoleChange}>
                      <option value="P">Patient</option>
                      <option value="D">Doctor</option>
                      <option value="S">Staff</option>
                    </select>
                  </div>
                  <div className='items'>
                    <label>First Name</label>
                    <input type='text' name='firstName' value={firstName} onChange={onChange}  required/>
                  </div>
                  <div className='items'>
                    <label>Last Name</label>
                    <input type='text' name='lastName' value={lastName} onChange={onChange}  required/>
                  </div>
                  <div className='items'>
                    <label>Address No.</label>
                    <input type='text' name='addressNo' value={addressNo} onChange={onChange} required/>
                  </div>
                  <div className='items'>
                    <label>Street</label>
                    <input type='text' name='street' value={street} onChange={onChange} required/>
                  </div>
                  <div className='items'>
                    <label>City</label>
                    <input type='text' name='city' value={city} onChange={onChange} required/>
                  </div>
                  <div className='items'>
                    <label>Province</label>
                    <input type='text' name='province' value={ province} onChange={onChange} required/>
                  </div>
                  <div className='items'>
                    <label>NIC</label>
                    <input type='text' name='nic' value={nic} onChange={onChange} required/>
                  </div>
                  <div className='items'>
                    <label>Phone No.</label>
                    <input type='text' name='phoneNumber' value={phoneNumber} onChange={onChange} required/>
                  </div>
                  <div className='items'>
                    <label>Email</label>
                    <input type='text' name='email' value={email} onChange={onChange} required/>
                  </div>
                  <div className='items'>
                    <label>Birthday</label>
                    <input type='date' name='birthday' value={birthday} onChange={onChange} required/>
                  </div>
                  <div className='items'>
                    <label>Gender</label>
                    <input type='text' name='gender' value={gender} onChange={onChange} required/>
                  </div>
                  <div className='items'>
                    <label>Username</label>
                    <input type='text' name='username' value={username} onChange={onChange} required/>
                  </div>
                  <div className='items'>
                    <label>Password</label>
                    <input type='password' name='password' value={password} onChange={onChange} required/>
                  </div>  
                </div>    
                <ButtonMain type='submit' text="Signup" height="35px" width="430px" variant="contained" color="#000000" bgColor={greenMain} bgHoverColor={greenHover} />
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
