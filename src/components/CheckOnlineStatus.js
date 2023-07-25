
import React, { useEffect, useState } from 'react'
import { Alert } from '@mui/material';

function CheckOnlineStatus() {

    const [isOnline, setIsOnline] = useState(navigator.onLine);
    const [alertOnline, setAlertOnline] = useState(false);

    useEffect(() => {
        function onlineHandler() {
            setIsOnline(true);
            setAlertOnline(true);
            setTimeout(handleClose, 3000);
        }

        function offlineHandler() {
            setIsOnline(false);
        }

        window.addEventListener("online", onlineHandler);
        window.addEventListener("offline", offlineHandler);

        return () => {
            window.removeEventListener("online", onlineHandler);
            window.removeEventListener("offline", offlineHandler);
        };
    }, []);

    const handleClose = () => {
        setAlertOnline(false);
    };

    return (
        <>
            {isOnline ? (
                alertOnline ? <Alert severity="success" className="mt-1" onClose={handleClose}>You are back online , good job!.</Alert> : <></>
            ) : (
                <Alert severity="warning" className="mt-1" >You are offline. Please check your internet connection.</Alert>
            )}
        </>
    )
}

export default CheckOnlineStatus