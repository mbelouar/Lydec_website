import React, { useEffect, useState } from 'react'
import Input from '../Components/Input'
import { setClient,modifyClient } from '../Controllers/setData'
import { fetchClient } from '../Controllers/getData'

const AjouterClient = () => {
    const [action,setAction]=useState('ajouter');
    const [data,setData]=useState({Nom:'',Prenom:'',Email:'',Password:'',Adresse:''})
    const [toModify,setToModify]=useState({id:'',Nom:'',Prenom:'',Email:'',Password:'',Adresse:''})
    const [err,seterr]=useState('')
    const [err2,seterr2]=useState('')
    const handleClick=(e)=>{
        e.preventDefault();
        setClient(data,seterr);
    }
    const handleAction=(e)=>{
        setAction(e.target.name);
        seterr('');
        seterr2('');
    }
    const handleSearch=()=>{
        fetchClient(toModify.id,setToModify,seterr2);
    }
    const handleUpdate=(e)=>{
        e.preventDefault();
        modifyClient(toModify,seterr2);
    }
    useEffect(()=>{
        if(action==='ajouter'){
            document.getElementById('ajouter').style.backgroundColor='rgb(0,139,220)'
            document.getElementById('ajouter').style.color='white'
            document.getElementById('modifier').style.backgroundColor='white'
            document.getElementById('modifier').style.color='black'
        }else{
            document.getElementById('modifier').style.backgroundColor='rgb(0,139,220)'
            document.getElementById('modifier').style.color='white'
            document.getElementById('ajouter').style.backgroundColor='white'
            document.getElementById('ajouter').style.color='black'
        }
    },[action])
  return (
    <div className='main'>
        <div className='actionChoice'>
            <button name='ajouter' id='ajouter'  onClick={handleAction}>Ajouter</button>
            <button name='modifier' id='modifier' onClick={handleAction}>Modifier</button>
        </div>
        
        {action === 'ajouter'?
        <div className='ajouterClient'>
            {err!==''?<p style={{marginBottom:'15px'}} className='err'>{err}</p>:null}
            <form onSubmit={handleClick} method='POST'>
                <Input
                    name='Nom'
                    type='text'
                    data={data}
                    setData={setData}
                    value={data.Nom}
                />
                <Input
                    name='Prenom'
                    type='text'
                    data={data}
                    setData={setData}
                    value={data.Prenom}
                />
                <Input
                    name='Email'
                    type='email'
                    data={data}
                    setData={setData}
                    value={data.Email}
                />
                <Input
                    name='Adresse'
                    type='text'
                    data={data}
                    setData={setData}
                    value={data.Adresse}
                />
                <Input
                    name='Password'
                    type='password'
                    data={data}
                    setData={setData}
                    value={data.Password}
                />
                <button style={{backgroundColor:'rgb(109, 176, 26)'}} className='ajoutModifier' type='submit'>Ajouter</button>
            </form>
        </div>
        :
        <div className='modifierClient'>
            <div className='search'>
                <div>
                    <input placeholder='Veuillez entrer le ID ' type='number' min={0} name='id' value={toModify.id} onChange={(e)=>{setToModify((m)=>({...m,id:e.target.value}))}}></input>
                </div>
                <button onClick={handleSearch}>Chercher</button>
            </div>
            {err2!==''?<p style={{marginTop:'5px',marginBottom:'15px'}} className='err'>{err2}</p>:null}
            <form onSubmit={handleUpdate} method='POST'>
                <Input
                    name='Nom'
                    type='text'
                    data={toModify}
                    setData={setToModify}
                    value={toModify.Nom}
                />
                <Input
                    name='Prenom'
                    type='text'
                    data={toModify}
                    setData={setToModify}
                    value={toModify.Prenom}
                />
                <Input
                    name='Email'
                    type='email'
                    data={toModify}
                    setData={setToModify}
                    value={toModify.Email}
                />
                <Input
                    name='Adresse'
                    type='text'
                    data={toModify}
                    setData={setToModify}
                    value={toModify.Adresse}
                />
                <Input
                    name='Password'
                    type='password'
                    data={toModify}
                    setData={setToModify}
                    value={toModify.Password}
                />
                {toModify.Nom===''?
                    <button type='submit' className='ajoutModifier' disabled>Modifier</button>
                :
                    <button type='submit' className='ajoutModifier' style={{backgroundColor:'rgb(109, 176, 26)'}}>Modifier</button>
                }
            </form>
        </div>
        }
        
    </div>
  )
}

export default AjouterClient