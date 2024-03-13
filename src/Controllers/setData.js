
const setRec=async(reclamation,setErr)=>{
    const response=await fetch("http://localhost/PHP2/Client/setReclamation.php",{
        method:'POST',
        credentials:'include',
        body:JSON.stringify(reclamation)
    })
    await response.text().then(
        (message)=>{
            setErr(message);
        }
    )
}
const setConsommation=async(conso,setMessage)=>{
    if(conso.mois >= 1 && conso.annee > 0 && conso.consom > 0){
        let flag=true;

        const date=new Date()
        const year=date.getFullYear();
        const month=date.getMonth()+1;
        let mois=parseInt(conso.mois,10);
        let annee=parseInt(conso.annee,10);
        if(annee === year && mois > month){
            flag=false
        }
        if(flag){
            const formData=new FormData();
            formData.append('pic',conso.pic);
            formData.append('mois',conso.mois);
            formData.append('annee',conso.annee);
            formData.append('consom',conso.consom);

            const response=await fetch("http://localhost/PHP2/Client/setConsommation.php",{
                method:'POST',
                body:formData,
                credentials:'include'
            })
            await response.text().then(
                (data)=>{
                   setMessage(data);
                }
            )
        }else{
            setMessage('La date est invalide')
        }

    }else{
        setMessage('Verifier les valeurs des champs')
    }
}

const setClient=async(data,seterr)=>{
    const response=await fetch("http://localhost/PHP2/Admin/setClient.php",{
        method:'POST',
        credentials:'include',
        body:JSON.stringify(data)
    })
    await response.text().then(
        (res)=>{
            seterr(res);
        }
    )
}

const modifyClient=async(data,seterr)=>{
    const response=await fetch("http://localhost/PHP2/Admin/modifyClient.php",{
        method:'POST',
        credentials:'include',
        body:JSON.stringify(data)
    })
    await response.text().then(
        (res)=>{
            seterr(res);
        }
    )
}

const traiterReclam=async(id,hideRec)=>{
    const response=await fetch("http://localhost/PHP2/Admin/traiterReclam.php",{
        method:'POST',
        credentials:'include',
        body:JSON.stringify({Id:id})
    })
    await response.text().then(
        (msg)=>{
            if(msg==='true')
                hideRec()
        }
    )
}

const validerFacture=async(idFac,setMsg)=>{
    const response=await fetch("http://localhost/PHP2/Admin/validerFacture.php",{
        method:'POST',
        credentials:'include',
        body:JSON.stringify({Id:idFac})
    })
    await response.text().then(
        (msg)=>{
            setMsg(msg);
        }
    )
}

const modifierFacture=async(idFac,nvConso,mois,annee,setMsg)=>{
    const response=await fetch("http://localhost/PHP2/Admin/modifierFacture.php",{
        method:'POST',
        credentials:'include',
        body:JSON.stringify({Id:idFac,nvConso:nvConso,Mois:mois,Annee:annee})
    })
    await response.text().then(
        (msg)=>{
            setMsg(msg);
        }
    )
}

const setConsoAnn=async(file,setMsg)=>{
    const formdata= new FormData();
    formdata.append('fichier',file);
    const response=await fetch("http://localhost/PHP2/Admin/setConsoAnnuelle.php",{
        method:'POST',
        credentials:'include',
        body:formdata
    })
    await response.text().then(
        (msg)=>{
            setMsg(msg)
        }
    )
}

const notifierClient=async(annee,client,setMsg)=>{
    const response=await fetch("http://localhost/PHP2/Admin/notifierClient.php",{
        method:'POST',
        credentials:'include',
        body:JSON.stringify({Annee:annee,Client:client})
    })
    await response.text().then(
        (msg)=>{
            setMsg(msg)
        }
    )
}

module.exports={
    setRec,
    setConsommation,
    setClient,
    modifyClient,
    traiterReclam,
    validerFacture,
    modifierFacture,
    setConsoAnn,
    notifierClient
}