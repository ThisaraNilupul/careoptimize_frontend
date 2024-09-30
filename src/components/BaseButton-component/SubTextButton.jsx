import React from 'react';
import './SubTextButton.css';

function SubTextButton({text, height, width, onClick}) {
  return (
    <button className='subtext-custom-button' style={{height: height , width: width}} onClick={onClick}>
        {text}
    </button>
  )
}

export default SubTextButton;