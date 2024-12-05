import React, { forwardRef } from 'react';
import Button from '@mui/material/Button';

const ButtonMain = forwardRef(({text, type, height, width, onClick , icon, variant, bgColor, bgHoverColor, color, ...props}, ref) => {
  return (
    <div>
      <Button variant={variant}  color={color} endIcon={icon}
          ref={ref}
          sx={{
          backgroundColor: bgColor,
          width: width, 
          height: height, 
          '&:hover': {
            backgroundColor: bgHoverColor,
          }
        }}
        type={type}
        onClick={onClick}
        onMouseEnter={props.onMouseEnter}
        onMouseLeave={props.onMouseLeave}
        {...props}
      >
      {text}
      </Button>
    </div>  
  )
});

export default ButtonMain;


// variant="contained"