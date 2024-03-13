const { json } = require("react-router-dom");

const getFactures=async(setFactures,choices,seterr)=>{
    const response = await fetch("http://localhost/PHP2/Client/getFactures.php",{
        method:'POST',
        credentials:'include',
        body:JSON.stringify(choices)
    })

    await response.json().then(
        (objct)=>{
            objct.data?setFactures(objct.data):seterr(objct.msg);
        }
    )
}

const getFacture=async(setFacture,idFac)=>{
    const response= await fetch("http://localhost/PHP2/Client/getFacture.php",{
        method:'POST',
        credentials:'include',
        body:JSON.stringify({idFacture:idFac})
    })
    await response.json().then(
        (data)=>{
           setFacture(data);
        }
    )
}

const getStats=async(setStats)=>{
    const response=await fetch("http://localhost/PHP2/Client/getStats.php",{
        method:'GET',
        credentials:'include'
    })
    await response.json().then(
        (stats)=>{
            setStats(stats);
        }   
    )
}

const getReclam=async(setRec)=>{
    const response=await fetch("http://localhost/PHP2/Client/getReclamations.php",{
        method:'GET',
        credentials:'include'
    })
    await response.json().then(
        (rec)=>{
            setRec(rec.data)
        }   
    )
}

const fetchClient=async(id,setToModify,seterr)=>{
    if(id!==''){
        const response=await fetch("http://localhost/PHP2/Admin/getClient.php",{
            method:'POST',
            credentials:'include',
            body:JSON.stringify({Id:id})
        })
        await response.json().then(
            (rec)=>{
                rec.msg?seterr(rec.msg):setToModify(rec);
            }   
        )
    }else{
        seterr('Entrer une ID');
    }
}

const adminGetReclam=async(id,setData)=>{
    const response=await fetch("http://localhost/PHP2/Admin/getReclamations.php",{
        method:'POST',
        credentials:'include',
        body:JSON.stringify({Id:id})
    })
    await response.json().then(
        (rec)=>{
            setData(rec.data)
        }   
    )
}

const consoMensuelle=async(id,setData)=>{
    const response=await fetch("http://localhost/PHP2/Admin/getConsoMensuelle.php",{
        method:'POST',
        credentials:'include',
        body:JSON.stringify({Id:id})
    })
    await response.json().then(
        (rec)=>{
            setData(rec);
        }   
    )
}

const adminStats=async(setData)=>{
    const response=await fetch("http://localhost/PHP2/Admin/getStats.php",{
        method:'GET',
        credentials:'include',
    })
    await response.json().then(
        (rec)=>{
            setData(rec);
        }   
    )
}

const consoAnnuelle=async(setData,idClient)=>{
    const response=await fetch("http://localhost/PHP2/Admin/getConsoAnn.php",{
        method:'POST',
        credentials:'include',
        body:JSON.stringify({Id:idClient})
    })
    await response.json().then(
        (rec)=>{
            setData(rec);
        }   
    )
}
const getNotif=async(setData)=>{
    const response=await fetch("http://localhost/PHP2/Client/getNotif.php",{
        method:'GET',
        credentials:'include',
    })
    await response.json().then(
        (rec)=>{
            setData(rec);
        }   
    )
}

module.exports={
    getFactures,
    getFacture,
    getStats,
    getReclam,
    fetchClient,
    adminGetReclam,
    consoMensuelle,
    adminStats,
    consoAnnuelle,
    getNotif
}