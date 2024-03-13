import React,{useContext} from 'react'
import { Link,Outlet, useNavigate } from 'react-router-dom'
import { logout } from '../Controllers/login'
import contexte from '../Controllers/contexte';

const Nav = () => {
    const navigate=useNavigate();
    const userData=useContext(contexte);
    const handleClick=()=>{
        logout(navigate)
    }
  return (
    <>
    <div className='leftBar'>
        
    <div className='logout' onClick={handleClick}>
            <div>
                <p style={{fontSize:'22px',color:'white'}}><i class="fa-solid fa-right-from-bracket"></i></p>
            </div>
        </div>
        {userData.type=='client'?
            <div className='routes'>
                    <Link className='link' to=''><p>Factures</p></Link>
                    <Link className='link' to='insererConsommation'><p>Consommation</p></Link>
                    <Link className='link' to='reclamations'><p>Reclamations</p></Link>
            </div>
            :
            <div className='routes'>
                    <Link className='link' to=''><p style={{marginRight:"25px"}}><i class="fa-solid fa-house"></i></p></Link>
                    <Link className='link' to='ajouterClient'><p>Clients</p></Link>
                    <Link className='link' to='reclamations'><p>Reclamations</p></Link>
                    <Link className='link' to='mensuelles'><p>Consommations mensuelles</p></Link> 
            </div>
        }
        <div className='company'>
                <div>
                    <img style={{width:'75px', height:'75px'}} src="assets/WhatsApp Image 2024-03-07 à 14.38.18_88ca9c53.jpg"/>
                </div>
                <div>
                    <p>Lydec</p>
                </div>
        </div>
    </div>
    <Outlet/>
    </>
  )
}

export default Nav