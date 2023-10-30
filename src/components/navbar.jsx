// "use client"
import React, { useEffect, useState } from 'react'
import { useStateProvider } from '@/context/stateContext';
import { useCookies } from 'react-cookie';
import { VERIFY_AUTH_ROUTE } from '../utils/constants';
import axios from 'axios';
import { useRouter,usePathname } from 'next/navigation';
import {HOST} from "../utils/constants"
import { reducerCases } from '@/context/constants';
import Link from "next/link"
import Image from "next/image"
const Navbar = () => {

    const [{userInfo},dispatch]=useStateProvider();
    const [isLoaded,setIsloaded]=useState(false)
    const [isFixed,setIsFixed]=useState(false)
    const [Input, setInput] = useState("")
    const [cookie,setCookie,removeCookie]=useCookies();
    const [mode,setMode]=useState(true)
    const Router=useRouter()
    const pathname=usePathname();

    
    
    const handleLogin=()=>{
      dispatch({type:reducerCases.TOGGLELOGIN,showLogin:true})
      dispatch({type:reducerCases.TOGGLESIGNUP,showSignUp:false})
    }

    const handleJoin=()=>{
      dispatch({type:reducerCases.TOGGLESIGNUP,showSignUp:true})
      dispatch({type:reducerCases.TOGGLELOGIN,showLogin:false})
    }

    const navLinks=[
      {name:"Home",type:"link",handler:"#"},
      {name:"Gallery",type:"link",handler:"#"},
      {name:"Contact us",type:"link",handler:"#"},
      {name:"Login",type:"button",handler:handleLogin},
      {name:"Join Now",type:"button2",handler:handleJoin},
    ]
    
    function fix(){
      window.pageYOffset>0?setIsFixed(true):setIsFixed(false);
    }

    useEffect(()=>{
      
      if(pathname==="/"){
        document.addEventListener("scroll",fix)
      }
      return ()=>{
        removeEventListener("scroll",fix);
      }
    },[pathname,Router])
    
    useEffect(()=>{
      if(cookie.jwt && !userInfo){
        const verifyUser=async()=>{
          try{
            const {data:{user}}=await axios.post(VERIFY_AUTH_ROUTE,{},{withCredentials:true})
            let projectedUserInfo={...user}
            if(user.profileImage){
              projectedUserInfo={...projectedUserInfo,imageName:HOST + "/" + user.profileImage}
              
            }
            
            // delete projectedUserInfo.image
            dispatch({type:reducerCases.SET_USER,userInfo:projectedUserInfo})
            // if(user.loginId==="admin" ){
            //   dispatch({type:reducerCases.VERIFY_ADMIN,isAdmin:true})
            // }
            setIsloaded(true)
            // if(!user.isProfileInfoSet){
            //   Router.push("/profile")
            // }
            
           
              }catch(err){
                console.log(err)
              }
        }
        verifyUser();
      }
      else{
        setIsloaded(true)
      }

    },[cookie,isLoaded])

 
    return (
    <div className='w-full relative'>
      {false?
      <></>
      :
      <nav className={`  flex justify-between text-gray-700   items-center -mb-1 bg-white p-2`}>
        <h3 className='p-2 text-2xl text-gray-700'><Link href="/">HITOP</Link></h3>
        {/* <div>
        <input type="text" value={Input} onChange={(e)=>{setInput(e.target.value)}} placeholder='what are looking for?' className='w-80 ring-slate-300 ring-[0.5px]' />
        <button onClick={()=>{
          Router.push(`/search?q=${Input}`)
        }}>search</button>
        </div> */}


        {userInfo?
        (<ul className='flex items-center text=gray-700 space-x-3 p-2 text-sm'>
          <li className={`cursor-pointer`} onClick={()=>{Router.push("/seller/gigdisp")}}></li>

          <li className={`cursor-pointer`} onClick={()=>{
            
            // setMode(!mode);
            Router.push(buyerOrSeller==="seller"?"/seller/orders":"/buyers/orders")
          }}
            >
            
          </li>

          <li className={`cursor-pointer`} onClick={()=>{
            setMode(!mode);
            dispatch({type:reducerCases.CHANGE_STATUS,buyerOrSeller:mode?"seller":"buyer"})
            Router.push(mode?"/seller":"/buyers")
          }}
            >
            
          </li>
        
          {userInfo.imageName?(
          <li className='relative w-10 h-10 rounded-full cursor-pointer' onClick={()=>{Router.push("/profile")}}>
            <Image
            src={userInfo.imageName}
            fill
            alt="profile"
            className='rounded-full'
            />
          </li>)
          :
          (
            
          <li className=' cursor-pointer' 
          onClick={()=>{
            if(userInfo.loginId){
              Router.push("/user")
            }
            
            }}>
            <span className='p-2 flex items-center text-white justify-center bg-gray-700'>{userInfo?.firstName?.toUpperCase()} {userInfo?.lastName?.toUpperCase()}</span>
          </li>
          
          )}

        {(userInfo?.loginId === "admin") &&<li className=' cursor-pointer' onClick={()=>{Router.push("/admin/dashboard")}}>
            <span className='p-2 flex items-center  justify-center text-gray-700'>Admin Panel</span>
          </li>}

          <li className=' cursor-pointer' onClick={()=>{
            // dispatch({type:reducerCases.SET_USER,userInfo:{}})
            // dispatch({type:reducerCases.VERIFY_ADMIN,isAdmin:false})
            removeCookie("jwt");
            removeCookie('jwt', { path: '/', domain: 'localhost' });
            location.reload()
            // if(pathname.includes("admin")){
            //   Router.push("/admin/login")
            // }
            // window.location.reload();
            }}>
            <span className='p-2 flex items-center text-gray-700 justify-center'>Logout</span>
          </li>

          
        </ul>)
        :
        (<ul className='flex space-x-2 p-2 text-lg'>
        {/* {navLinks.map(({name,type,handler})=><li key={name} >
        {type==="link"?(<Link href={handler} className='p-1'>{name}</Link>)
        :
        (type==="button")?
        (<button onClick={handler}>{name}</button>)
        :
        (<button onClick={handler} className='bg-green-500 text-white p-1'>{name}</button>)}
        </li>)} */}
        </ul>)}
      </nav>
      }
      
    </div>
  )
}

export default Navbar
