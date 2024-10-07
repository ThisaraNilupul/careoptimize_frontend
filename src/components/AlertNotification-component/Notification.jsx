import React, { useEffect } from "react";
import { TfiFaceSad, TfiFaceSmile, TfiClose } from "react-icons/tfi";
import './Notification.css';


const Notification = ({status, message, onClose}) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 4000);

        return () => clearTimeout(timer);
    }, [onClose]);

    const successColors = {
        backgroundColor: '#74e272ac',
        color: '#0f880d'
    };

    const failureColors = {
        backgroundColor: '#f56b6b96',
        color: '#9c0909'
    };

    const currentColors = status === 'success' ? successColors : failureColors;

    return (
            <div className="notification-container" style={currentColors}>
                <div className="icon">
                    {status === 'success' ? <TfiFaceSmile /> : <TfiFaceSad />}
                </div>
                <div className="message">{message}</div>
                <div className="close" onClick={onClose}><TfiClose /></div>
            </div>
    )
}

export default Notification;