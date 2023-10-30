"use client"
import React, { use, useEffect, useState } from 'react'
import AddGood from "./addGood"
import { ADD_CATEGORY_ROUTE, ADD_GOODS_ROUTE, GET_CATEGORY_ROUTE } from '@/utils/constants';
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
    
    const [goods,setGoods]=useState([...init])
    const [category,setCategory]=useState("")
    const [categ,setCateg]=useState([])
    const [{userInfo}]=useStateProvider();

    useEffect(()=>{
    const getCategory =async ()=>{
        try{
         const {data:{cat}}=await axios.get(GET_CATEGORY_ROUTE,{withCredentials:true})
         if(cat){
            setCateg(cat);
         }
        }catch(err){
            console.log(err)
        }
    }
    getCategory()
    },[category])

    function onChange(e,index){
        let g=[...goods];
        g[index][e.target.name]=e.target.value;
        setGoods(g);
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
  return (
    <div>
    <div>
        <input 
        type="text" 
        value={category}
        onChange={(e)=>{
            setCategory(e.target.value)
        }}
        placeholder='Add category'
        className='p-2 focus:outline-none border  mt-3'
        />
        <button 
        className='p-2 outline-green-500 border border-green-500 text-green-500'
        onClick={()=>{
            handleAddCategory()
        }}
        >
            Add category
        </button>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-5">
    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" className="px-6 py-3">
                    DESCRIPTION
                </th>
                <th scope="col" className="px-6 py-3">
                    <div className="flex items-center">
                        UNIT PRICE
                        <a href="#"><svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3 ml-1" aria-hidden="true" fill="currentColor" viewBox="0 0 320 512"><path d="M27.66 224h264.7c24.6 0 36.89-29.78 19.54-47.12l-132.3-136.8c-5.406-5.406-12.47-8.107-19.53-8.107c-7.055 0-14.09 2.701-19.45 8.107L8.119 176.9C-9.229 194.2 3.055 224 27.66 224zM292.3 288H27.66c-24.6 0-36.89 29.77-19.54 47.12l132.5 136.8C145.9 477.3 152.1 480 160 480c7.053 0 14.12-2.703 19.53-8.109l132.3-136.8C329.2 317.8 316.9 288 292.3 288z"/></svg></a>
                    </div>
                </th>
                <th scope="col" className="px-6 py-3">
                    <div className="flex items-center">
                        RETAIL PRICE
                        <a href="#"><svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3 ml-1" aria-hidden="true" fill="currentColor" viewBox="0 0 320 512"><path d="M27.66 224h264.7c24.6 0 36.89-29.78 19.54-47.12l-132.3-136.8c-5.406-5.406-12.47-8.107-19.53-8.107c-7.055 0-14.09 2.701-19.45 8.107L8.119 176.9C-9.229 194.2 3.055 224 27.66 224zM292.3 288H27.66c-24.6 0-36.89 29.77-19.54 47.12l132.5 136.8C145.9 477.3 152.1 480 160 480c7.053 0 14.12-2.703 19.53-8.109l132.3-136.8C329.2 317.8 316.9 288 292.3 288z"/></svg></a>
                    </div>
                </th>
                <th scope="col" className="px-6 py-3">
                    <div className="flex items-center">
                        WHOLESALE PRICE
                        <a href="#"><svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3 ml-1" aria-hidden="true" fill="currentColor" viewBox="0 0 320 512"><path d="M27.66 224h264.7c24.6 0 36.89-29.78 19.54-47.12l-132.3-136.8c-5.406-5.406-12.47-8.107-19.53-8.107c-7.055 0-14.09 2.701-19.45 8.107L8.119 176.9C-9.229 194.2 3.055 224 27.66 224zM292.3 288H27.66c-24.6 0-36.89 29.77-19.54 47.12l132.5 136.8C145.9 477.3 152.1 480 160 480c7.053 0 14.12-2.703 19.53-8.109l132.3-136.8C329.2 317.8 316.9 288 292.3 288z"/></svg></a>
                    </div>
                </th>
                <th scope="col" className="px-6 py-3">
                    <div className="flex items-center">
                        CATEGORY
                        <a href="#"><svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3 ml-1" aria-hidden="true" fill="currentColor" viewBox="0 0 320 512"><path d="M27.66 224h264.7c24.6 0 36.89-29.78 19.54-47.12l-132.3-136.8c-5.406-5.406-12.47-8.107-19.53-8.107c-7.055 0-14.09 2.701-19.45 8.107L8.119 176.9C-9.229 194.2 3.055 224 27.66 224zM292.3 288H27.66c-24.6 0-36.89 29.77-19.54 47.12l132.5 136.8C145.9 477.3 152.1 480 160 480c7.053 0 14.12-2.703 19.53-8.109l132.3-136.8C329.2 317.8 316.9 288 292.3 288z"/></svg></a>
                    </div>
                </th>
                {/* <th scope="col" className="px-6 py-3">
                    <span className="sr-only">Edit</span>
                </th> */}
            </tr>
        </thead>
        <tbody>

          {goods?.map((val,i)=>(
            <AddGood key={i} val={val} index={i} goods={goods} onChange={onChange} categ={categ}/>
          ))}
            
            
        </tbody>
    </table>
</div>
<div className='text-right'>
<button 
className=' mt-5 px-3 py-1 bg-green-500 text-white'
onClick={()=>{
    handleAdd()
}}
>
    Add
</button>
<button 
className='ml-5 mt-5 px-3 py-1 bg-red-500 text-white'
onClick={()=>{
    setGoods([...init]);
}}
>
    Clear
</button>

</div>

    </div>
  

    </div>
  )
}

export default page
