import React from 'react';
import './SubButton.css';


const SubButton = ({text, icon, height, width, onClick}) => {
  return (
    <button className='sub-custom-button' style={{height: height , width: width}} onClick={onClick}>
        {React.cloneElement(icon, { size: 20, color: "#333", })}
    </button>
  )
}

export default SubButton