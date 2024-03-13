
const verify=async(setData)=>{
    const response=await fetch("http://localhost/PHP2/Auth/verify.php",{
        method:'GET',
        credentials:'include'
    });
    await response.json().then(
        (data)=>{
            setData(data)
        }
    )

}

const loginFct=async(data,setErr,navigate)=>{
    const formData = new FormData();

    if(data.Email !== '' || data.Password !== ''){
        formData.append('Email',data.Email);
        formData.append('Password',data.Password);
        
        const response=await fetch("http://localhost/PHP2/Auth/login.php",{
            method:'POST',
            body:formData,
            credentials:'include'
        })
        await response.text().then(
            (objct)=>{
                if(objct==='admin')
                    navigate('/admin');
                else if(objct==='client')
                    navigate('/board');
                else
                    setErr(objct)
            }
        )
    }else{
        setErr('Ne laissez pas de champs vides!')
    }
}

const logout=async(navigate)=>{
    const response=await fetch("http://localhost/PHP2/Auth/logout.php",{
        method:"GET",
        credentials:'include'
    })
    await response.text().then(
        (data)=>{
            if(data === 'true')
                navigate("/")
        }
    )
}
module.exports={
    loginFct,
    logout,
    verify
}