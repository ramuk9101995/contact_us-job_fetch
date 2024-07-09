import React, { useState } from 'react'
import  axios from 'axios'

const Contactform = () => {
    const [name,setName] = useState()
    const [email,setEmail] = useState()
    const [message,setMessage] = useState()
    const [recv,setRecv] = useState()

    const handleSubmit =async (e)=>{
        e.preventDefault()
        try {
            const formData = {
                name:name,
                email:email,
                message:message
            }
            
            const sendData = await axios.post('https://www.greatfrontend.com/api/questions/contact-form',formData)
            if (sendData){
                setName('')
                setEmail('')
                setMessage('')
                window.alert('message send success')
                setRecv(sendData?.data)
                console.log(sendData)
            }else{
                console.log(sendData?.error)
            }
        } catch (error) {
            console.log(error)
        }
    }
  return (
    <>

    <form onSubmit={handleSubmit} >
        <input type='text' placeholder='Name' value={name} onChange={(e)=>setName(e.target.value)}/>
        <input type='email' placeholder='Email' value={email} onChange={(e)=>setEmail(e.target.value)}/>
        <input type='text' placeholder='message' value={message} onChange={(e)=>setMessage(e.target.value)}/>
        <button  >Send</button>

    </form>
   <h1>{recv}</h1>
    </>
    
  )
}

export default Contactform