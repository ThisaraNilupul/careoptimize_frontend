import React from 'react';
import { ReactComponent as Logo } from '../../assets/LoadingLogo.svg';
import './LoadingLeft.css';

function LoadingLeft() {
  return (
    <div>
        <div className='logo'>
            <Logo width="35%" height="45%"/>
        </div>
        <div className='heading-1'>
            CARE OPTIMIZE
        </div>
        <div className='heading-2'>
            Healthcare Management System
        </div>
        <div className='description'>
            Manage patient information and appointments efficiently
        </div>
    </div>
  )
}

export default LoadingLeft;
