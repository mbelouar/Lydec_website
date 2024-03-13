import React from 'react'
import { traiterReclam } from '../Controllers/setData'

const RecAdmin = ({id,emetteur,date,type,desc}) => {
    const hideRec=()=>{
        document.getElementById(id).style.display='none';
    }
    const handleTraiter=()=>{
        traiterReclam(id,hideRec);
    }
  return (
    <div className='recCard' id={id}>
        <div>
            <p>{id}</p>
        </div>
        <div>
            <p>{emetteur}</p>
        </div>
        <div className='descContainer'>
            <p>{type}</p>
            {desc?<p className='desc'>{desc}</p>:null}
        </div>
        <div>
            <p>{date}</p>
        </div>
        <div>
            <button onClick={handleTraiter}><i class="fa-solid fa-check fa-xl" style={{color:'white'}}></i></button>
        </div>
    </div>
  )
}

export default RecAdmin