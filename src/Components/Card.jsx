import React, { useContext } from 'react'
import {Link} from 'react-router-dom'
import userData from '../Controllers/contexte';

const Card = ({id,mois,montant,status,nom,prenom}) => {
    const user=useContext(userData);
    let statusColor='';
    switch (status){
        case '0':
            status=<i class="fa-solid fa-x"></i>
            statusColor='red'
            break;
        case '1':
            status=<i class='fa-solid fa-check'></i>
            statusColor="green"
            break;
        case '2':
            status=<i style={{padding:'5px'}} class="fa-solid fa-exclamation fa-lg"></i>
            statusColor="gray"
            break;
    }

  return (
    <Link className='link' to={user.type==='client'?`facture?q=${id}`:`../facture?q=${id}`}>
        <div className='card'>
            {
                user.type!=='client'?
                <div>
                    <p><span className='span1'>Client : </span>{`${nom} ${prenom}`}</p>
                </div>
                :null
            }
            <div>
                <p><span className='span1'>Mois : </span>{mois}</p>
            </div>
            <div>
                <p><span className='span1'>Montant : </span>{status!=='Avec anomalie'?`${montant} DH`:'-'}</p>
            </div>
            <div>
                <p><span className='span1'></span><span className='span2' style={{backgroundColor:statusColor}}>{status}</span></p>
            </div>
        </div>
    </Link>
  )
}

export default Card