import React, { useEffect, useState } from 'react'
import Nav from '../Components/Nav'
import { verify } from '../Controllers/login'
import userData from '../Controllers/contexte'
import { useNavigate } from 'react-router-dom'

const Admin = () => {
  const navigate=useNavigate()
    const [data,setUserData]=useState({id:'',nom:'',prenom:'',adresse:'',type:'',message:''});
    useEffect(()=>{
        verify(setUserData);
    },[])
    useEffect(()=>{
      if(data.message==="false" || data.type==="client")
          navigate("../")
  },[data.message])
  return (
    
    <userData.Provider value={data}>
        <div className='Board'>
                <Nav/>
        </div>
    </userData.Provider>
  )
}

export default Admin