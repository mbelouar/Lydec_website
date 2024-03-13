import React,{useEffect, useState} from 'react'
import { setRec } from '../Controllers/setData';

const Recbanner = ({display,setDisplay,setErr}) => {
    const [reclamation,setReclamation]=useState({type:'Fuite Interne',desc:null});
    const handleClick=()=>{
        setDisplay('none')
    }
    const handleChange=(e)=>{
        setReclamation(r=>({...r,[e.target.name]:e.target.value}))
    }
    const handleSubmit=()=>{
        setErr('')
        setRec(reclamation,setErr);
        handleClick();
    }
  return (
    <div className='recBanner' style={{display:display}}>
        <div style={{display:'flex', alignItems:'center', justifyContent:'space-between'}}>
            <h1></h1>
            <i class="fa-solid fa-xmark fa-2xl" style={{color:'#f2f2f3',cursor:'pointer'}} onClick={handleClick}></i>
        </div>
        <div>
            <select name='type' id='type' onChange={handleChange}>
                <option value='Fuite Interne' checked>Fuite Interne</option>
                <option value='Fuite Externe'>Fuite Externe</option>
                <option value='Factures'>Factures</option>
                <option value='Autre'>Autre</option>
            </select>
        </div>
        <textarea id='desc' name='desc' rows={10} onChange={handleChange}></textarea>
        <button onClick={handleSubmit} id='btnRec 'name='envoyer'>Envoyer</button>
    </div>
  )
}

export default Recbanner