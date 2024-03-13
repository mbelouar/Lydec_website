import React from 'react'

export const Reclam = ({id,type,desc,date,status}) => {
    let statusColor=''
    switch (status){
        case '0':
            statusColor="yellow";
            break;
        case '1':
            statusColor="rgb(109, 176, 26)";
            break;
    }
  return (
    <div className='recCard' style={{backgroundColor:statusColor}}>
        <div>
            <p><span>ID : </span>{id}</p>
        </div>
        <div className='descContainer'>
            <p><span>Type : </span>{type}</p>
            {desc?<p className='desc'>{desc}</p>:null}
        </div>
        <div>
            <p><span>Envoyee le : </span>{date}</p>
        </div>
    </div>
  )
}
