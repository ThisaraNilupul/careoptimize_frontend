import React from 'react';
import './SubButton.css';


const SubButton = ({text, icon, height, width, onClick}) => {
  return (
    <button className='sub-custom-button' style={{height: height , width: width}} onClick={onClick}>
        {icon}{text}
    </button>
  )
}

export default SubButton