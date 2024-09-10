import React, { useEffect } from "react";
import { TfiFaceSad, TfiFaceSmile, TfiClose } from "react-icons/tfi";
import './Notification.css';


const Notification = ({status, message, backgroundColor, onClose}) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 4000);

        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <div className="notification-container" style={{backgroundColor: backgroundColor}}>
            <div className="icon">
                {status === 'sucess' ? <TfiFaceSmile /> : <TfiFaceSad />}
            </div>
            <div className="message">{message}</div>
            <div className="close" onClick={onClose}><TfiClose /></div>
        </div>
    )
}

export default Notification;