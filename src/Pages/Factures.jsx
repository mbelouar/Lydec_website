import React, { useEffect, useState } from 'react'
import SearchBar from '../Components/SearchBar'
import Card from '../Components/Card'
import {getFactures} from '../Controllers/getData'
import Stats from '../Components/Stats'

const Factures = () => {
    const date=new Date();
    const year=date.getFullYear();
    const [choices,setChoices]=useState({annee:year,status:-1});
    const [err,seterr]=useState('');
    const [factures,setFactures]=useState([]);
    useEffect(()=>{
        getFactures(setFactures,choices,seterr);
    },[]);
    const handleSearch=()=>{
        setFactures([]);
        seterr('');
        getFactures(setFactures,choices,seterr);
    }

  return (
    <div className='main' style={{paddingTop:'50px'}}>
        <SearchBar title='Factures' choices={choices} setChoices={setChoices} year={year} handleSearch={handleSearch}/>
        <div className='cardContainer'>
            {err!==''?<h1 className='err' style={{backgroundColor:'rgb(0,139,202)'}}>{err}</h1>:null}
            {
                factures.map((f)=>{
                   return (
                        <Card
                            id={f.id}
                            mois={`${f.mois}/${f.annee}`}
                            montant={f.montant}
                            status={f.status}
                        />
                   )
                })
            }
        </div>
    </div>
  )
}

export default Factures