import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { FaImages, FaThumbsUp, FaArrowCircleLeft, FaShareAlt, FaListUl, FaRegClock } from "react-icons/fa";
import { useNavigate } from 'react-router-dom'
import { formatDate, shareMyScreen } from './auxilaryFunctions';
import { Alert } from '@mui/material';


function DetailScreen() {
  const { id } = useParams()

  const [goodData, hasData] = useState(false)
  const [data, setData] = useState([])
  const navigate = useNavigate()

  const [alertSuccess, setAlertSuccess] = useState(false);
  const [alertFailure, setAlertFailure] = useState(false);

  useEffect(() => {
    const idquestion = { id };
    fetchData(idquestion)
  }, [])

  function fetchData(idquestion) {
    const url = "https://private-anon-2bb33cf5e4-blissrecruitmentapi.apiary-mock.com/questions/" + idquestion.id;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        const existData = data !== '' || typeof data !== 'undefined';
        hasData(existData)
        setData(data)        
      });
  }

  function handleReturn() {
    navigate("/questions")
  }

  const handleClose = () => {
    setAlertSuccess(false);
    setAlertFailure(false);
  };

  function sendVote(idquestion, choice) {  

    data.choices.find((element) => {
      var addvote = element.choice === choice ? element.votes++ : element.votes;
      return element.choice === choice && { ...data.choices, choice: addvote };
    })    
    
    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    };

    // var newData = {...data}; //data updated

    fetch('https://private-anon-03d9905103-blissrecruitmentapi.apiary-mock.com/questions/'+idquestion, requestOptions)
      .then(async response => {
        const isJson = response.headers.get('content-type')?.includes('application/json');
        const result = isJson && await response.json();

        if (response.ok) {        
          setAlertSuccess(true);          
        }else{
          setAlertFailure(true);          
        }

        setTimeout(handleClose, 3000);

        setData(result) //here it's the real deal , display the date returned from post/put
        // setData(newData) here we can increment the value directly without waiting for the fetch
      })
      .catch(error => {
        setAlertFailure(true);     
        setTimeout(handleClose, 3000);
      });
  }

  return (
    <>
      {goodData ?
        <>
          <div className="button-row">
            <button className="btn btn-action" onClick={() => handleReturn()}>Return to list<br /><FaArrowCircleLeft color='white' className='mt-2' /></button>
            <button className="btn btn-action" onClick={shareMyScreen}>Share screen<br /><FaShareAlt color='white' className='mt-2' /></button>
          </div>
          <div className='item-profile'>
            <div className='row'>
              <div className="question-image2">
                <img className="profile-image" alt="<dataimage>" src={data.image_url} height={400} width={600} />
              </div>
              <div className="question-info2">
                <h5>Question nº{id}</h5>
                <span>{data.question}</span>
                <br /><small>This question has {data.choices.length} answers</small>
              </div>
            </div>
            <div className="about">
              <span>Published at {formatDate(data.published_at)} &ensp; <FaRegClock color='white' size={10} /> </span>
            </div>
          </div>
          <div className='item-body'>
            <span className='item-header'><FaListUl color='orange' size={24} />&ensp;Answers available for voting</span>&ensp;          
            <br />            
            <ul className="text-white nostyle mt-4">               
            { alertSuccess ? <Alert severity="success" onClose={handleClose}>Answer voted with success</Alert>:<></>}   
            { alertFailure ? <Alert severity="error" onClose={handleClose}>Occured an error on voting</Alert>:<></>}   
              {data.choices.map((c, index) => (            
                  <li key={data.id + "_" + index}>
                    <div key={data.id + "_" + index} className="list-group-item row text-white">
                      <FaImages size={40} />
                      <div>
                        <h5>{c.choice}</h5>
                        <p><small className='smalltext'>Currently has {c.votes} votes &ensp;<FaThumbsUp color='white' size={16} /></small></p>
                      </div>
                      <div className="about">                        
                        <button className="btn btn-action" onClick={() => sendVote(data.id, c.choice)}>Vote this answer&emsp;<FaThumbsUp color='green' size={20} /></button>
                      </div>
                    </div>
                  </li>              
              ))}
            </ul>

          </div>
        </>
        : navigate("/NotFound")
      }
    </>

  )
}

export default DetailScreen