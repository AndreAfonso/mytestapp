import React, { useEffect, useState } from 'react'
import ReactLoading from 'react-loading'
import { useNavigate } from 'react-router-dom'
import { FaRedo } from "react-icons/fa";

function LoaderMain() {

    const [startLoading, setLoading] = useState()
    const [isServUp, setServUp] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        checkServStatus()
    }, [])

    useEffect(() => {
        if (isServUp) {
            navigate("/questions")
        }
    }, [isServUp])

    function checkServStatus() {
        setLoading(true)
        setTimeout(() => {
            fetch("https://private-anon-f300a2fdae-blissrecruitmentapi.apiary-mock.com/health")
                .then((response) => response.json())
                .then((json) => {
                    const servUP = json.status === 'OK';
                    setLoading(false)
                    setServUp(servUP);
                });
        }, 1000); //Has one second delay on purpose to see the loading screen , the fetch is so fast getting the status.        
    }

    return (
        <>
            {startLoading ? <><h1>Please wait , checking the server status</h1>
                <ReactLoading type={"spinningBubbles"} color={"cyan"} height={'10%'} width={'10%'} /> </>
                :
                isServUp ?
                    <></> : <><h1>Server status <span className="span-danger">NOK</span></h1><button onClick={() => checkServStatus()} className="btn btn-retry">Retry action&ensp;<FaRedo color='white' /></button></>
            }
        </>
    )
}

export default LoaderMain