import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { FaImages, FaThumbsUp, FaBrush, FaDownload, FaShareAlt, FaRegClock } from "react-icons/fa";
import { useNavigate } from 'react-router-dom'
import { Alert } from '@mui/material';
import { formatDate, shareMyScreen } from './auxilaryFunctions';

function ListScreen() {
  const [goodData, hasData] = useState(false)
  const [data, setData] = useState([])

  const [searchParams, setSearchParams] = useSearchParams({ filter: '' })
  const filter = searchParams.get("filter")
  const navigate = useNavigate()
  const [fetchAgain, reFetch] = useState(false);

  const [alert, setAlert] = useState(false);
  const [offsetVal, setOffset] = useState(10);

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    if (fetchAgain) {      
      fetchData()
    }
  }, [fetchAgain])

  const handleClose = () => {
    setAlert(false);
  };

  function fetchData() {
    fetch(`https://private-anon-9db0aa7dcb-blissrecruitmentapi.apiary-mock.com/questions?limit=10&offset=${offsetVal}&filter=filter`)
      .then((response) => response.json())
      .then((results) => {
        // console.log(e)
        const existData = results.length > 0 || typeof results !== 'undefined';
        hasData(existData);  

        if (fetchAgain) {
          data.map((d) => {          
            return (
              results.push(d)
            )
          });         
          setAlert(true);
          setTimeout(handleClose, 3000);
          reFetch(false);
        }
        setData(results);
        setOffset(prev=> prev + 10);

      });
  }

  function handleCheck(e) {
    navigate("/questions/" + e)
  }

  return (
    <>
      {goodData ?
        <>
          <div>
            <div className="search-text">Search:</div>
            <input id="searchbox" autoFocus type="text" value={filter} onChange={e => setSearchParams({ filter: e.target.value })}></input>
          </div>
          <div className="button-row">
            <button className="btn btn-action" onClick={shareMyScreen}>Share screen<br /><FaShareAlt color='white' className='mt-2' /></button>
            <button className="btn btn-action" onClick={e => reFetch(true)}>Get more data<br /><FaDownload color='white' className='mt-2' /></button>
            <button className="btn btn-action" onClick={e => setSearchParams({ filter: "" })}>Clear search<br /><FaBrush color='white' className='mt-2' /></button>
          </div>
          {alert ? <Alert severity="success" onClose={handleClose}>Fetched more data with success</Alert> : <></>}
          <div>
            <ul className="list-group text-white nostyle">
              {
                data.map((d, index) => {
                  return (
                    <div key={d.id + "_" + index}>
                      <li className="list-group-item" onClick={() => handleCheck(d.id)} key={d.id}>
                        <div className="question-body">
                          <div className="row">
                            <div className="question-image">
                              <img className="image-portait" alt="<dataimage>" src={d.thumb_url} height={120} width={120} />
                            </div>
                            <div className="question-info">
                              <h5>Question nº{d.id}</h5>
                              <h6>{d.question}<br /><small>This question has {d.choices.length} answers</small></h6>
                            </div>
                          </div>
                          <div className="about">
                            <span>Published at {formatDate(d.published_at)}&ensp;<FaRegClock color='white' size={12} /></span>
                          </div>
                        </div>
                      </li>
                      <ul className="text-white customstyle">
                        {d.choices.filter((item => {
                          var first = searchParams.get('filter').toLowerCase() === '' ? item : item.choice.toLowerCase().includes(searchParams.get('filter').toLowerCase());
                          return !first ? searchParams.get('filter') === '' ? item : item.votes === parseInt(searchParams.get('filter')) : first;
                        })).map((c, index) => (
                          <li key={d.id + "_" + index}>
                            <div key={data.id + "_" + index} className="list-group-inneritem row text-white">
                              <FaImages size={36} />
                              <h5>{c.choice}</h5>
                              <div className="about">
                                <span><FaThumbsUp color='green' />&ensp;{c.votes} votes</span>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )
                })
              }
            </ul>
          </div>
        </>
        :
        <></>
      }
    </>
  )
}

export default ListScreen
