import React, { useState } from 'react'
import { setConsommation } from '../Controllers/setData';

const InsererConso = () => {
    const [message,setMessage]=useState('');
    const [conso,setConso]=useState({pic:'',mois:0,annee:0,consom:''});
    let date= new Date();
    date=date.getFullYear();
    const handleChange=(e)=>{
        setConso(c=>({...c,[e.target.name]:e.target.value}));
    }
    const handleSubmit=(e)=>{
        e.preventDefault();
        setMessage('');
        setConsommation(conso,setMessage)
    }
  return (
    <div className='main'>
        <div className='insererConsommation'>
            {message !== ''?<p className='err' style={{color:'white'}}>{message}</p>:null}
            <form onSubmit={handleSubmit} encType='multipart/form-data'>
                
                <div className='dateIn'>
                    <label>Mois / Annee:</label>
                    <div>
                        <input onChange={handleChange} name='mois' type='number' min={1} max={12} required></input>
                        <p>/</p>
                        <input onChange={handleChange}  name='annee' type='number' min={1} max={date} required></input>
                    </div>
                </div>
                <div className='conoIn'>
                    <label>Consommation indique Kwh:</label>
                    <div>
                        <input onChange={handleChange}  name='consom' type='number' min={0} required></input>
                    </div>
                </div>
                <div className='imageIn'>
                    <div>
                      
                    </div>
                    <div>
                        <label>
                        <i class="fa-solid fa-cloud-arrow-up fa-2xl"></i>
                            <input onChange={(e)=>{setConso(c=>({...c,pic:e.target.files[0]}))}} name='pic' type='file' accept='images/*' required></input>
                        </label>
                    </div>
                </div>
                <button type='submit' name='sendConso'>Envoyer</button>
            </form>
        </div>
    </div>
  )
}

export default InsererConso