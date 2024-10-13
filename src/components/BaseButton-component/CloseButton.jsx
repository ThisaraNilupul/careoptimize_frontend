import React from 'react';
import './CloseButton.css'

function CloseButton({icon, height, width, onClick}) {
  return (
    <button className='close-button' style={{height: height , width: width}} onClick={onClick}>
        {React.cloneElement(icon, { size: 22, color: "#333", })}
    </button>   
  )
}

export default CloseButton;
