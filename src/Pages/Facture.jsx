import React, { useEffect, useState } from 'react'
import { getFacture } from '../Controllers/getData';

const Facture = () => {
    const prams=new URL(document.location).searchParams
    const idFact=prams.get('q');
    const [facture,setFacture]=useState({prix_ht:'',prix_ttc:'',conso:'',mois:'',annee:'',status:'',pic:''});

    let statusColor='';
    switch (facture.status){
        case '0':
            statusColor='red'
            break;
        case '1':
            statusColor="green"
            break;
        case '2':
            statusColor="gray"
            break;
    }
    const handleUpload=()=>{
       window.location.href='http://localhost/PHP2/Client/uploadPDF.php?id='+idFact;
    }
    useEffect(()=>{
        getFacture(setFacture,idFact);
    },[])

  return (
    <div className='main'>
        <div className='uneFacture'>
            <div className='box1'>
                <div className='imageHolder'>
                    <img  style={{width:"200px", height:"200px"}} src={`http://localhost/PHP2/uploads/${facture.pic}`}></img>
                </div>
                <div className='TTC'>
                    <h1>Prix TTC : {facture.status!=='2'?`${facture.prix_ttc} DH`:'-'}</h1>
                </div>
            </div>
            <div className='box2'>
                <div>
                    <p><span>ID Facture :</span> {idFact}</p>
                    <p><span>Consommation :</span> {facture.conso} Kwh</p>
                </div>
                <div>
                    <p><span>Prix HT :</span> {facture.status!=='2'?`${facture.prix_ht} DH`:'-'}</p>
                    <p><span>Mois :</span> {`${facture.mois}/${facture.annee}`}</p>
                </div>
            </div>
            {facture.status==='2'?
                <button disabled>Telecharger</button>
            :
                <button onClick={handleUpload}>Telecharger</button>
            }
        </div>
   </div> 
  )
}

export default Facture