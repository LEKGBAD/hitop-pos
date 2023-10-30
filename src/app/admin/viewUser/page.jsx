"use client"
import React, { use, useEffect, useState } from 'react'
import AddUser from "./addUsers"
import { ADD_CATEGORY_ROUTE, ADD_GOODS_ROUTE, DELETE_GOODS_ROUTE, DELETE_USERS_ROUTE, GET_CATEGORY_ROUTE, GET_GOODS_ROUTE, GET_USERS_ROUTE, UPDATE_GOODS_ROUTE, UPDATE_USERS_ROUTE } from '@/utils/constants';
import axios from 'axios';
import { useStateProvider } from '@/context/stateContext';
import AuthWrapper from '@/components/AuthWrapper';

const page = () => {
    const init=[
        {description:"",unitPrice:"",retailPrice:"",wholesalePrice:"",category:""},
        {description:"",unitPrice:"",retailPrice:"",wholesalePrice:"",category:""},
        {description:"",unitPrice:"",retailPrice:"",wholesalePrice:"",category:""},
        {description:"",unitPrice:"",retailPrice:"",wholesalePrice:"",category:""},
        {description:"",unitPrice:"",retailPrice:"",wholesalePrice:"",category:""},
        {description:"",unitPrice:"",retailPrice:"",wholesalePrice:"",category:""},
        {description:"",unitPrice:"",retailPrice:"",wholesalePrice:"",category:""},
        {description:"",unitPrice:"",retailPrice:"",wholesalePrice:"",category:""},
        {description:"",unitPrice:"",retailPrice:"",wholesalePrice:"",category:""},
        {description:"",unitPrice:"",retailPrice:"",wholesalePrice:"",category:""},
    ];
    
    const [users,setUsers]=useState([])
    const [category,setCategory]=useState("")
    const [categ,setCateg]=useState([])
    const [dele,setDele]=useState([]);
    const [update,setUpdate]=useState([]);
    const [{userInfo}]=useStateProvider()
    // const [showDeleteButton,setShowDeleteButton]=useState(false);

    

    useEffect(()=>{
        const getUsers=async()=>{
          try{
            const {data:{user}}=await axios.get(GET_USERS_ROUTE,{withCredentials:true})
            if(user){
                setUsers(user)
            }
            }catch(err){
                console.log(err)
            }

        }
        getUsers()
    },[])

    

    function onChange(e,index){
        if(e.target.name === "select"){
            const g=dele.find((val)=>val===users[index].id)
            let gfiltered=[];
            if(g){
                gfiltered=dele.filter(val=>val !==g);
                setDele(gfiltered);

            }
            else{
                setDele([...dele,users[index].id]);    
            }
            
            return
        }
        
        let g=[...users];
        g[index][e.target.name]=e.target.value;
        setUsers(g);

        const u=update.find((val)=>val===users[index].id)
            let gfiltered=[];
            if(u){
                return

            }
            else{
                setUpdate([...update,{id:users[index].id,ind:index}]);    
            }
        
    }

    function handleAdd(){
        const addGoods=async ()=>{
            try{
            const filteredGoods=goods.filter(good=>good.description != "");
            const {data:{success}}=await axios.post(ADD_GOODS_ROUTE,{goods:filteredGoods},{withCredentials:true})
            if(success){
                setGoods(init)
            }
            }catch(err){
                console.log(err)
            }
        }
        addGoods()
    }

    function handleAddCategory(){
        const addCategory= async ()=>{
            try{
                if(category){
                    const response=await axios.post(ADD_CATEGORY_ROUTE,{category},{withCredentials:true})

                    if(response.status === 201){
                        setCategory("");
                    }
                }

            }catch(err){
                console.log(err)
            }
        }
        addCategory()
    }
    async function handleUpdate(){
        try{
            const response=await axios.post(UPDATE_USERS_ROUTE,{users,update},
                {withCredentials:true})
                if(response.status===200){
                    window.location.reload();
                }
        }catch(err){
            console.log(err)
        }
    }
    async function handleDelete(){
        try{
            const response=await axios.post(DELETE_USERS_ROUTE,{dele},
                {withCredentials:true})
                if(response.status===200){
                    window.location.reload();
                }
        }catch(err){
            console.log(err)
        }

    }
  return (
    <div>
    <div>
        {/* <input 
        type="text" 
        value={category}
        onChange={(e)=>{
            setCategory(e.target.value)
        }}
        placeholder='Add category'
        className='p-2 focus:outline-none border border-slate-300  mt-3'
        />
        <button 
        className='p-2 outline-green-500 border border-green-500 text-green-500'
        onClick={()=>{
            handleAddCategory()
        }}
        >
            Add category
        </button> */}
        {dele.length ? <button 
        className='p-2 bg-red-500 border border-red-500 text-white'
        onClick={()=>{
            handleDelete()
        }}
        >
            Delete Records
        </button>:""}

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg ">
    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
            <th scope="col" className="px-6 py-3">
                
                </th>
                <th scope="col" className="px-6 py-3">
                    LOGIN ID
                </th>
                <th scope="col" className="px-6 py-3">
                    <div className="flex items-center">
                        FIRST NAME
                        <a href="#"><svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3 ml-1" aria-hidden="true" fill="currentColor" viewBox="0 0 320 512"><path d="M27.66 224h264.7c24.6 0 36.89-29.78 19.54-47.12l-132.3-136.8c-5.406-5.406-12.47-8.107-19.53-8.107c-7.055 0-14.09 2.701-19.45 8.107L8.119 176.9C-9.229 194.2 3.055 224 27.66 224zM292.3 288H27.66c-24.6 0-36.89 29.77-19.54 47.12l132.5 136.8C145.9 477.3 152.1 480 160 480c7.053 0 14.12-2.703 19.53-8.109l132.3-136.8C329.2 317.8 316.9 288 292.3 288z"/></svg></a>
                    </div>
                </th>
                <th scope="col" className="px-6 py-3">
                    <div className="flex items-center">
                        LAST NAME
                        <a href="#"><svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3 ml-1" aria-hidden="true" fill="currentColor" viewBox="0 0 320 512"><path d="M27.66 224h264.7c24.6 0 36.89-29.78 19.54-47.12l-132.3-136.8c-5.406-5.406-12.47-8.107-19.53-8.107c-7.055 0-14.09 2.701-19.45 8.107L8.119 176.9C-9.229 194.2 3.055 224 27.66 224zM292.3 288H27.66c-24.6 0-36.89 29.77-19.54 47.12l132.5 136.8C145.9 477.3 152.1 480 160 480c7.053 0 14.12-2.703 19.53-8.109l132.3-136.8C329.2 317.8 316.9 288 292.3 288z"/></svg></a>
                    </div>
                </th>
                <th scope="col" className="px-6 py-3">
                    <div className="flex items-center">
                        CREATED AT
                        <a href="#"><svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3 ml-1" aria-hidden="true" fill="currentColor" viewBox="0 0 320 512"><path d="M27.66 224h264.7c24.6 0 36.89-29.78 19.54-47.12l-132.3-136.8c-5.406-5.406-12.47-8.107-19.53-8.107c-7.055 0-14.09 2.701-19.45 8.107L8.119 176.9C-9.229 194.2 3.055 224 27.66 224zM292.3 288H27.66c-24.6 0-36.89 29.77-19.54 47.12l132.5 136.8C145.9 477.3 152.1 480 160 480c7.053 0 14.12-2.703 19.53-8.109l132.3-136.8C329.2 317.8 316.9 288 292.3 288z"/></svg></a>
                    </div>
                </th>
                
            </tr>
        </thead>
        {<tbody>

          {users?.map((val,i)=>(
            <AddUser key={i} val={val} index={i} users={users} onChange={onChange} categ={categ}/>
          ))}
            
            
        </tbody>}
    </table>
</div>
<div className='text-right'>
<button 
disabled={update.length?false:true}
className={` mt-5 px-3 py-1 ${update.length?"bg-green-500":"bg-slate-500"} text-white`}
onClick={()=>{
    handleUpdate()
}}
>
    Update
</button>
<button 
className='mt-5 px-3 py-1 bg-green-500 ml-5 text-white'
onClick={()=>{
    window.location.reload();
}}
>
    Cancel
</button>

</div>

    </div>
    </div>
  )
}

export default page
