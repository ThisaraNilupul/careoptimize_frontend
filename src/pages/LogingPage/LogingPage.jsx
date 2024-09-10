import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import LoadingLeft from '../../components/loading-left-component/LoadingLeft';
import './LogingPage.css';

function LogingPage() {
  const [formData, setFormDate] = useState({
    username: '',
    password: ''
  });
  const navigate = useNavigate();

  const { username, password } = formData;

  const onChange = (e) => setFormDate({ ...formData, [e.target.name]: e.target.value});
  console.log(formData);

  const onSubmit = async (e) => {
    e.preventDefault();

    try{
      const response = await axios.post('http://localhost:5000/api/patient/login', { username, password});
      console.log('Response from server:', response.data);
      const { token } = response.data;
      console.log('Token: ', token);
      localStorage.setItem('token', token);
      alert('Login Successfull..!');
      navigate('/patient/home');

    } catch (error) { 

      if (error.response && error.response.data && error.response.data.error) {
        const errors = error.response.data.error;
        let errorMsg = '';
        errors.forEach(err => {
          errorMsg += `${err.msg}\n`;
        });
        
        alert('Login Failed...! \n' + errorMsg);
      } else {
        console.error('Login error:', error);
        alert('Login Failed: Network error or server is down.');
      }    
    }
  }

  return (
    <div className='loging-page'>
        <div className='logingpage-leftside'>
            <LoadingLeft />
        </div>
        <div className='logingpage-rightside'>
            <div className='heading-1'>Log in</div>
            <div className='heading-2'>Resource management</div>
            <form onSubmit={onSubmit}>
                <input type='text' name='username' value={username} onChange={onChange} placeholder='Username' required/>
                <input type='password' name='password' value={password} onChange={onChange} placeholder='Password' required/>
                <button type='submit'>Log in</button>
            </form>
            <div className='links'>
              <a href='#'>Forgot your password?</a>
              <a href='registerpage'>Register</a>
            </div>
      </div>
    </div>
  )
}

export default LogingPage
