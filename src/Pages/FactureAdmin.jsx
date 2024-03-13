import React,{useState, useEffect} from 'react'
import { getFacture } from '../Controllers/getData';
import { modifierFacture, validerFacture } from '../Controllers/setData';

const FactureAdmin = () => {
    const prams=new URL(document.location).searchParams
    const idFact=prams.get('q');
    const [facture,setFacture]=useState({prix_ht:'',prix_ttc:'',conso:'',mois:'',annee:'',status:'',pic:''});
    const [afficher,setAfficher]=useState(false);
    const [nvConsommation,setNvConsommation]=useState('')
    const [msg,setMsg]=useState('');

    
    const handleValider=()=>{
        validerFacture(idFact,setMsg);
    }
    const handleModifier=()=>{
        modifierFacture(idFact,nvConsommation,facture.mois,facture.annee,setMsg);
    }
    useEffect(()=>{
        getFacture(setFacture,idFact);
    },[msg])
    useEffect(()=>{
        if(msg==='Facture Valider' || msg==='Consommation Modifier'){
            setFacture((f)=>({...f,status:'0'}))
        }
    },[msg])

  return (
    <div className='main'>
        {msg!==''?<p className='factureMsg'>{msg}</p>:null}
        <div className='uneFacture'>
            <div className='box1'>
                <div className='imageHolder'>
                    <img style={{width:"200px", height:"200px"}}  src={`http://localhost/PHP2/uploads/${facture.pic}`}></img>
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
                    <p><span>Prix HT :</span> {facture.status!=='2'?`${facture.prix_ttc} DH`:'-'}</p>
                    <p><span>Mois :</span> {`${facture.mois}/${facture.annee}`}</p>
                </div>
            </div>
            {
                facture.status==='2'?
                    <>
                        <button style={{backgroundColor:'green',marginRight:'25px'}} onClick={handleValider}>Valider</button>
                        <div className='modifierConso'>
                    <div>
                        <input type='number' name='modifierConso' value={nvConsommation} onChange={(e)=>{setNvConsommation(e.target.value)}} placeholder='Conosmmation KWh'></input>
                    </div>
                    <div>
                        <button onClick={handleModifier}>Modifier</button>
                    </div>
                </div>
                    </>
                :
                    null
            }
               
        </div>
    </div>
  )
}

export default FactureAdmin