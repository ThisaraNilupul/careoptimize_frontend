import React from 'react';
import Button from '@mui/material/Button';

const ButtonMain = ({text, height, width, onClick , icon, variant, bgColor, bgHoverColor, color}) => {
  return (
    <div>
      <Button variant={variant}  color={color} endIcon={icon}
          sx={{
          backgroundColor: bgColor,
          width: width, 
          height: height, 
          '&:hover': {
            backgroundColor: bgHoverColor,
          }
        }}

        onClick={onClick}
      >
      {text}
      </Button>
    </div>  
  )
}

export default ButtonMain;


// variant="contained"