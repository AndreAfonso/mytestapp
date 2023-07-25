import React from 'react'
import ReactLoading from 'react-loading'
import { FaArrowCircleLeft } from "react-icons/fa";
import { useNavigate } from 'react-router-dom'

export default function NotFound() {
  const navigate = useNavigate()
  return (
    <>
    <h1>Ops , page not found</h1>
    <ReactLoading type={"cylon"} color={"orange"} height={'10%'} width={'10%'} /> 
    <br/>
    <button className="btn btn-action" onClick={() => navigate(-1)}>Return to previous page<br/><FaArrowCircleLeft color="white" className="mt-2" /></button>
    </> 
  )
}
