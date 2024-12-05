import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import LoadingLeft from '../../components/loading-left-component/LoadingLeft';
import ButtonMain from '../../components/BaseButton-component/Button';
import Notification from '../../components/AlertNotification-component/Notification';
import { green} from '@mui/material/colors';

const greenMain = green.A400;
const greenHover = green.A700;

function Verification() {
    const userEmail = localStorage.getItem('email');
    const [verificationCode, setVerificationCode] = useState('');
    const [notification, setNotification] = useState(null);
    const navigate = useNavigate();

    const handleVerify = async (e) => {
        e.preventDefault();

        try{
            const response = await axios.post('http://localhost:5000/api/verify', {
                email: userEmail,
                code: verificationCode,
            });

            if (response.status === 200) {
                setNotification({
                    status: 'success',
                    message: response.data.msg
                });
                setTimeout(() => {
                    navigate('/login');
                }, 500);  
            }

        } catch (error) {
            setNotification({
                status: 'falied',
                message: error.response.data.msg
            });
        }
    }

    const closeNotification = () => {
        setNotification(null);
    };

  return (
    <div className='Register-page'>
        <div className='Registerpage-leftside'>
            <LoadingLeft />
        </div>
        <div className='Registerpage-rightside'>
            <div className='registerheading-1'>Verify Your Identity</div>
            <form onSubmit={handleVerify} className='baseForm'>
                <div className='items'>
                    <label>Verification code</label>
                    <input type='text' name="verificationCode" value={verificationCode} onChange={(e) => setVerificationCode(e.target.value)}  required/>
                </div>
                <ButtonMain type='submit' text="Verify" height="35px" width="430px" variant="contained" color="#000000" bgColor={greenMain} bgHoverColor={greenHover} />
            </form>
            <div className='Registerpagelinks'>
              <p>Verification code sent to your email. Please check your inbox (and spam/junk folder).<br/> If you didn't receive it, you can request a new code.</p>
            </div>
            <div className='Registerpagelinks'>
              <a href='/login'>Send Code</a>
            </div>
        </div>
        {notification && (
            <Notification 
                status={notification.status}
                message={notification.message}
                height={notification.height}
                width={notification.width}
                backgroundColor={notification.backgroundColor}
                onClose={closeNotification}
            />
        )}
    </div>
  )
}

export default Verification;
