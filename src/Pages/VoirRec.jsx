import React, { useEffect, useState } from 'react'
import RecAdmin from '../Components/RecAdmin'
import { adminGetReclam } from '../Controllers/getData';
import SearchById from '../Components/SearchById';

const VoirRec = () => {
    const [idClient,setIdClient]=useState('');
    const [data,setData]=useState([]);

    useEffect(()=>{
        adminGetReclam(idClient,setData);
    },[])
  return (
    <div className='main'>
        <div className='recAdmin'>
            <SearchById 
                setIdClient={setIdClient} 
                idClient={idClient} 
                func={adminGetReclam}
                setData={setData}
                title='Reclamations Des Clients'
            />
            <div className='recContainer'>
                {   
                    data.length!==0 ?
                        data.map((recla)=>{
                            return(
                                <RecAdmin
                                    id={recla.id}
                                    emetteur={recla.nom}
                                    type={recla.type}
                                    date={recla.dateRec}
                                    desc={recla.description}
                                />
                            )
                        })
                    :
                        <h1 style={{marginTop:'15%',height:'200px',paddingTop:'90px',backgroundColor:'transparent',color:'rgba(100,100,100)'}} className='err'>AUCUNE RECLAMATION POUR CE CLIENT</h1>
                }
            </div>
        </div>
    </div>
  )
}

export default VoirRec