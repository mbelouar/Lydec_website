import React from 'react'

const SearchById = ({setIdClient,idClient,func,setData,title}) => {
    const handleClick=()=>{
        //if(idClient!==''){
            func(idClient,setData);
        //}
    }
  return (
        <div className='header' style={{margin:'0px'}}>
            <div>
                <input 
                    type='number' 
                    min={1} 
                    name='id' 
                    placeholder='Id Client..' 
                    value={idClient} 
                    onChange={(e)=>{setIdClient(e.target.value)}}
                />
                <button onClick={handleClick}><i class="fa-solid fa-magnifying-glass" style={{color:'whitesmoke'}}></i></button>
            </div>
        </div>
  )
}

export default SearchById