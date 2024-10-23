import React from 'react';
import './BaseCard.css';

function HomeCard({ width, height, children ,backgroundColor}) {
    const style = {
        width: width || 'auto',
        height: height || 'auto',
        backgroundColor: backgroundColor,
        borderRadius: '15px',
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

export default HomeCard
