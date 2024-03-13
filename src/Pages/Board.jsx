import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Nav from '../Components/Nav'
import { verify } from '../Controllers/login'
import userData from '../Controllers/contexte'

const Board = () => {
    const navigate=useNavigate();
    const [data,setUserData]=useState({id:'',nom:'',prenom:'',adresse:'',type:'',message:''});
    useEffect(()=>{
        verify(setUserData);
    },[])
    useEffect(()=>{
      if(data.message === "false" || data.type==="admin")
        navigate("../");
    },[data.message])
  return (
    
    <userData.Provider value={data}>
        <div className='Board'>
                <Nav/>
        </div>
    </userData.Provider>
  )
}

export default Board