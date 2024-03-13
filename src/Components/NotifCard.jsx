import React from 'react'

const NotifCard = ({message,date}) => {
  return (
    <div className='notifCard'>
        <div>
            <p>{message}</p>
        </div>
        <div>
            <p>{date}</p>
        </div>
    </div>
  )
}

export default NotifCard