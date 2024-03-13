import React, { useEffect, useState } from 'react'
import SearchById from '../Components/SearchById'
import Card from '../Components/Card';
import { consoMensuelle } from '../Controllers/getData';

const VoirConsoMen = () => {
    const [data,setData]=useState({anomalie:[],unpaid:[]});
    const [idClient,setIdClient]=useState(" ");
    useEffect(()=>{
        consoMensuelle(idClient,setData);
    },[])
  return (
    <div className='main'>
        <div className='recAdmin'>
            <SearchById 
                idClient={idClient} 
                setIdClient={setIdClient} 
                setData={setData}
                func={consoMensuelle}
                title='Consommations Mensuelles'
            />
        </div>
        <div className='cardContainer' style={{margin:'0px'}}>
            {  
                    data.anomalie.map((a)=>{
                        return(
                            <Card
                                id={a.id}
                                mois={`${a.mois}/${a.annee}`}
                                montant={a.montant}
                                status={a.statu}
                                nom={a.nom}
                                prenom={a.prenom}
                            />
                        );
                    })
                
            }
        </div>
        <div className='cardContainer' style={{margin:"0px"}}>
            {  
                data.unpaid.map((u)=>{
                    return(
                        <Card
                            id={u.id}
                            mois={`${u.mois}/${u.annee}`}
                            montant={u.montant}
                            status={u.statu}
                            nom={u.nom}
                            prenom={u.prenom}
                        />
                    );
                })
               
            }
        </div>
    </div>
  )
}

export default VoirConsoMen