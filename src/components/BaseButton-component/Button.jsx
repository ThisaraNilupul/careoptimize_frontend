import React from 'react';
import './CustomButton.css';


const Button = ({text, height, width, onClick}) => {
  return (
    <button className='custom-button' style={{height: height , width: width}} onClick={onClick}>
        {text}
    </button>
  )
}

export default Button
