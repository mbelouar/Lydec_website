import React from 'react'

const Input = ({type,name,setData,data,value}) => {
  return (
    <div className='inputHolder'>
      
      <input
        type={type}
        name={name}
        value={value}
        placeholder={name}
        onChange={(e)=>{setData(d=>({...d,[name]:e.target.value}))}}
        required
      />
    </div>
  )
}

export default Input