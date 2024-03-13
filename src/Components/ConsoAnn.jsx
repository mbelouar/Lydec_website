import React, { useEffect, useState } from 'react'
import { notifierClient } from '../Controllers/setData'

const ConsoAnn = ({idClient,nom,prenom,annee,conso,date,status}) => {
    const [msg,setMsg]=useState('false');
    const animation=[
        {opacity:0},
        {opacity:0.8},
        {opacity:1},
        {opacity:1},
        {opacity:1},
        {opacity:0.8},
        {opacity:0}
    ]
    const tiime={
        duration:3000,
        iterations:1
    }
    const handleClick=()=>{
        notifierClient(annee,idClient,setMsg);
    }
    useEffect(()=>{
        if(msg==='true')
            document.getElementById(`${idClient}${annee}`).animate(animation,tiime);
        setMsg('false');
    },[msg])
  return (
    <div className='consoAnn'>
        <div>
           <p><span>Client : </span>{`${nom} ${prenom}`}</p>
        </div>
        <div>
           <p><span>Annee : </span>{annee}</p>
        </div>
        <div>
           <p><span>Consommation : </span>{conso} Kwh</p>
        </div>
        <div>
           <p><span>Saisie Le : </span>{date}</p>
        </div>
        <div>
            {status == 0 ?
                <button onClick={handleClick}><i class="fa-solid fa-triangle-exclamation fa-lg" style={{color:'white'}}></i></button>
                :
                null
            }
        </div>
        <div className='popup' id={`${idClient}${annee}`}>
            Notification Envoye
        </div>
    </div>
  )
}

export default ConsoAnn