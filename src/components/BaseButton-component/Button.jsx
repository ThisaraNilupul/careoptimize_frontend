import React from 'react';
import './CustomButton.css';


const Button = ({text, height, width}) => {
  return (
    <button className='custom-button' style={{height: height , width: width}}>
        {text}
    </button>
  )
}

export default Button
