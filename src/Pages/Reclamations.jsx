import React, { useEffect, useState } from 'react'
import { Reclam } from '../Components/Reclam'
import Recbanner from '../Components/Recbanner'
import { getReclam } from '../Controllers/getData';

const Reclamations = () => {
    const [display,setDisplay]=useState('none');
    const [rec,setRec]=useState([{}]);
    const [err,setErr]=useState('');
    const handleClick=()=>{
        setDisplay('block');
    }
    useEffect(()=>{
        getReclam(setRec);
    },[err])
  return (
    <div className='main'>
        <div className='reclamation'>
            <div className='header'>
                <button onClick={handleClick}>+</button>
                {err!==''?<p style={{backgroundColor:"rgb(0,139,202)"}}>{err}</p>:null}
            </div>
            {
                rec.map((r)=>{
                    return(
                        <Reclam id={r.id} type={r.type} desc={r.description} date={r.dateRec} status={r.status}/>
                    )
                })
            }
            
        </div>
            <Recbanner display={display} setDisplay={setDisplay} setErr={setErr}/>
    </div>
  )
}

export default Reclamations