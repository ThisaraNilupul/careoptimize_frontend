import React from 'react';
import './SubButton.css';


const SubButton = ({ icon, height, width, onClick}) => {
  return (
    <button className='sub-custom-button' style={{height: height , width: width}} onClick={onClick}>
        {icon}
    </button>
  )
}

export default SubButton