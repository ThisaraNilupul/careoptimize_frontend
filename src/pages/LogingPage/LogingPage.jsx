import React from 'react';
import LoadingLeft from '../../components/loading-left-component/LoadingLeft';
import './LogingPage.css';

function LogingPage() {
  return (
    <div className='loging-page'>
        <div className='logingpage-leftside'>
            <LoadingLeft />
        </div>
        <div className='logingpage-rightside'>
            <div className='heading-1'>Log in</div>
            <div className='heading-2'>Resource management</div>
            <form>
                <input type='text' placeholder='Enter patient ID' />
                <input type='password' placeholder='Password' />
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
