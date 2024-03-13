import React, { useState } from 'react'
import Input from '../Components/Input'
import { loginFct } from '../Controllers/login';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate=useNavigate();
    const [data,setData]= useState({Email:"",Password:""});
    const [err,setErr]= useState('');

    const handleSubmit=(e)=>{
        e.preventDefault();
        loginFct(data,setErr,navigate);
    }    

  return (
    <section className='loginPage'>
        <div style={{display:"flex", justifyContent:"space-around",width:"70%",marginLeft:"15%" }}>
            <div style={{width:"700px", height:"500px"}}>
                <img style={{width:"100%", height:"100%", objectFit:"cover"}} src="assets/6310507.jpg"/> 
           </div>
        <div className='formContainer'>
            {err !== ""?<p className='err'>{err}</p>:null}
            <form onSubmit={handleSubmit} method='POST'>
                <h1>Welcome Back</h1>
                <Input
                    type='email'
                    name='Email'
                    setData={setData}
                    data={data}
                    value={data.Email}
                />
                <Input
                    type='password'
                    name='Password'
                    setData={setData}
                    data={data}
                    value={data.Password}
                />
                <button type='submit'>Login</button>
            </form>
        </div>
        </div> 
    </section>
  )
}

export default Login