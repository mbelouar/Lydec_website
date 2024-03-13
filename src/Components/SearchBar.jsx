import React, { useEffect, useState } from 'react'

const SearchBar = ({title,choices,setChoices,year,handleSearch}) => {
    
    const handleChange=(e)=>{
        setChoices(c=>({...c,[e.target.name]:e.target.value}));
    }
  return (
    <div className='searchBar'>
        <div>
            <input type="number" max={year} name='annee'  value={choices.annee} onChange={handleChange}  />
        </div>
        <h1>{title}</h1>
        <div>
            <select name='status'  onChange={handleChange}>
                <option value={-1} cheked>Tous</option>
                <option value={1}>Payee</option>
                <option value={0}>Non Payee</option>
                <option value={2}>Avec Anomalie</option>
            </select>
        </div>
        <button className='btn' onClick={handleSearch}>Chercher</button>
    </div>
  )
}

export default SearchBar