"use client"
import React, { useState } from 'react'

import { reducerCases } from '@/context/constants'
import { SIGNUP_ROUTE,LOGIN_ROUTE } from '@/utils/constants'
import axios from "axios"
import { useCookies } from 'react-cookie'
import { useStateProvider } from '@/context/stateContext'
import { useRouter } from 'next/navigation'
import dynamic from 'next/dynamic'

const AuthWrapper = ({type,forr}) => {
  const Router=useRouter();
  const [values,setValues]=useState({loginId:"",password:"",firstName:"",lastName:""});
  const [{userInfo},dispatch]=useStateProvider();
  const [cookies]=useCookies();

  function handleChange(e){
    setValues({...values,[e.target.name]:e.target.value});
  }

  async function handleClick(){
    try{
      const {loginId,password,firstName,lastName}=values;
      if(loginId && password){
        const {data:{user}}=await axios.post(type==="Login"?LOGIN_ROUTE:SIGNUP_ROUTE,
          {loginId,password,firstName,lastName},
          {
            withCredentials:true,
            headers:{
              Authorization: `Bearer ${cookies.jwt}`
            }
          })
          // dispatch({type:reducerCases.SHOW_AUTH_MODAL,showAuthModal:false});
          if(user){
            console.log(user)
            if(type==="Login" && forr ==="user"){
              console.log("hi")
              // dispatch({type:reducerCases.SET_USER,userInfo:user})
              window.location.reload();
            }
            else{
              // Router.push("/admin/dashboard")
              window.location.reload();
            }
            
            
          }
        
      }
      // return "missing email or password"
      

    }catch(err){
      console.log(err)
    }
    
  }
  return (
    <div className='relative z-20'>
      <div className="fixed top-[80px] w-screen h-screen ">
        <div className="fixed left-[16px] top-[80px] h-full w-full backdrop-blur-md"></div>
        <div className="flex flex-col h-full w-full justify-center items-center">
            <div className="fixed bg-white  flex flex-col h-max w-max justify-center items-center">
                <div className="flex flex-col justify-center bg-white relative z-[10] items-center gap-5 p-4">
                    <h3 className='text-3xl text-slate-500'>{((forr==="admin") && (type==="Login"))?"Admin Login":type}</h3>
                    {/* <button className='relative flex w-80 justify-center p-2  text-white bg-[#1e40af]  items-center border '>
                        <MdFacebook className='absolute left-3  text-white '/>
                        Continue with Facebook
                    </button>
                    <button className='relative flex w-80 justify-center p-2  items-center border gap-1'>
                        <MdFacebook className='absolute left-3'/>
                        Continue with Google
                    </button>
                    <div className='relative text-center z-100 w-80'>
                    <span className='before:absolute before:w-80 before:h-[0.5px] before:top-[50%] before:left-0 before:bg-slate-300'>
                    <span className='relative bg-white p-2'>OR</span>
                    </span>
                    </div> */}
                    {type==="Add User" && <input type="text" name="firstName" value={values.firstName} onChange={handleChange} placeholder='First Name'  className="w-80 p-1 border" />
}
                    {type==="Add User" && <input type="text" name="lastName" value={values.lastName} onChange={handleChange} placeholder='Last Name'  className="w-80 p-1 border" />
                      }
                    <input type="text" name="loginId" value={values.loginId} onChange={handleChange} placeholder='Login Id'  className="w-80 p-1 border" />
                    <input type="password" name="password" value={values.password} onChange={handleChange} placeholder='Password'  className="w-80 p-1 border" />
                    
                    <button onClick={handleClick} className='w-80 block bg-green-500 text-white p-3'>Continue</button>
                    <div>
                      
                    {/* {showLogin?
                    (
                      <span className='text-sm'>New here? <span onClick={()=>{
                        dispatch({type:reducerCases.TOGGLELOGIN,showLogin:false});
                      dispatch({type:reducerCases.TOGGLESIGNUP,showSignUp:true})
                      }} className='text-green-500 cursor-pointer' >
                        Sign Up
                        </span></span>
                    ) :
                    (
                    <span className='text-sm'>Already a member? <span onClick={()=>{
                      dispatch({type:reducerCases.TOGGLELOGIN,showLogin:true});
                      dispatch({type:reducerCases.TOGGLESIGNUP,showSignUp:false});
                    }} className='text-green-500 cursor-pointer' >
                      Login
                      </span></span>
                    )
                    } */}
                    </div>

                </div>
            </div>
        </div>
      </div>
      
    </div>
  )
}

export default AuthWrapper
// export default dynamic(()=>Promise.resolve(AuthWrapper),{ssr:false}) 
