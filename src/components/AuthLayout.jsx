//mechanism to protect pages and routes
import React, {useState, useEffect} from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export default function Protected({children, authentication=true})
{ 
  const navigate=useNavigate();
  const authStatus=useSelector(state=>state.auth.status)
 const [loader,SetLoader]=useState(true)
 useEffect(()=>{
   if(authentication&&authStatus!==authentication) //true&&true
   {
     navigate('/login')
   }
   else if(!authentication&&authStatus!==authentication) //true&&true
   {
     navigate('/')
   }
   SetLoader(false)
 },[authStatus,navigate,authentication])
    return loader?<h1>Loading...</h1>:<>{children}</>
}

