"use client"
import { CHANGE_PASSWORD_ROUTE } from '@/utils/constants';
import axios from 'axios';
import React,{useState} from 'react'

function page() {
    const [values,setValues]=useState({currentPassword:"",newPassword:"",confirmNewPassword:""})
    const [message,setMessage]=useState("")
    

    function handleChange(e){
        const {name,value}=e.target;
        setValues({...values,[name]:value})
    }
    async function handleClick(){
      setMessage("");
     try{
        if(values.newPassword && values.currentPassword && values.confirmNewPassword){
            const {data:{user,mess}}=await axios.post(CHANGE_PASSWORD_ROUTE,{...values},{withCredentials:true})
           if(user){
            setMessage("Password Changed")
            setValues({currentPassword:"",newPassword:"",confirmNewPassword:""})
           }
           if(mess){
            setMessage(mess)
           }
        }

     }catch(err){
        console.log(err);
     }
    }
  return (
    <div className='h-screen flex justify-center items-center'>
        <div className='flex flex-col justify-center bg-white relative z-[10] items-center gap-5 p-4'>
      <h3 className='text-center '>Change Password</h3>
      <h6 className={`text-sm ${message==="Password Changed"?"text-green-500":"text-red-500"}`}>{message}</h6>
      <input type="" name="currentPassword" value={values.currentPassword} onChange={handleChange} placeholder='Enter Password'  className="w-80 p-1 border" />
      <input type="" name="newPassword" value={values.newPassword} onChange={handleChange} placeholder='Enter New Password'  className="w-80 p-1 border" />
      <input type="" name="confirmNewPassword" value={values.confirmNewPassword} onChange={handleChange} placeholder='Confirm New Password'  className="w-80 p-1 border" />
      <button onClick={handleClick} className='w-80 block bg-green-500 text-white p-3'>Change Password</button>

      </div>

    </div>
  )
}

export default page
