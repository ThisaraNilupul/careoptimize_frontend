import React from 'react';
import './BaseCard.css';

const Card = ({ width, height, children }) => {
    const style = {
        width: width || 'auto',
        height: height || 'auto',
        backgroundColor: '#ffffff',
        borderRadius: '4px',
        padding: '20px',
        minwidth: '50%',
        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',

    }

  return (
    <div style={style}>
         {children}
    </div>
  )
}

export default Card;
