"use client"
import React, { useState,useRef, useEffect} from 'react'
import dynamic from 'next/dynamic'
// import {goods} from "./goods"
import axios from 'axios'
import { GET_GOODS_ROUTE } from '@/utils/constants'
import { useStateProvider } from '@/context/stateContext'

 const SalesPage = ({sa,setSa,sal,index}) => {

  let filteredGoods=useRef([]);
    const [sale,setSale]=useState(sal);
    const [goods,setGoods]=useState([]);
    const [{mode}]=useStateProvider()

  useEffect(()=>{
 const getGoods =async ()=>{
  
  try{
    const {data:{good}}=await axios.get(GET_GOODS_ROUTE,{
      withCredentials:true
    })
    if(good){
      setGoods(good);
    }
  }catch(err){
    console.log(err)
  }
  
 }
 getGoods()
  },[sale])
    function handleChange(e){
      const {name,value}=e.target;
      if(name==="description"){
        console.log()
        filteredGoods.current=goods.filter(({description})=>description.toLocaleLowerCase().includes(sa[index].description));
        
      }
       let s=[...sa];
       s[index][name]=value;
       if(!s[index].description){
        s[index].salesPrice="";
        s[index].unitPrice="";
        s[index].quantity="";
       }
       s[index].amount=s[index].description ? s[index].salesPrice*s[index].quantity:"";
       s[index].costPrice=s[index].description ? s[index].unitPrice*s[index].quantity:"";
       setSa([...s])
    
    }

    function handleClick(i){

     let {description,retailPrice,wholesalePrice,unitPrice,category} =filteredGoods.current[i];
      let ss=[...sa];
      ss[index].description=description;
      ss[index].category=category;
      ss[index].salesPrice=!mode?retailPrice:wholesalePrice;
      ss[index].unitPrice=unitPrice;
      ss[index].costPrice=ss[index].quantity ? unitPrice*ss[index].quantity:"";
      ss[index].amount=ss[index].quantity ?ss[index].quantity*ss[index].salesPrice:"";

      setSa([...ss]);
      filteredGoods.current=[];
    }
  return (
      
      <ul className='grid grid-cols-5'>

      <li className='border relative col-span-2 '>
      <input name="description"  value={sa[index].description} onChange={handleChange} type="text" className="peer w-full text-xl focus:outline-none px-2" />
        {sa[index].description && (<ul  className='flex flex-col  peer-focus:flex  bg-white w-full absolute z-10 top-7 px-2'>
          {filteredGoods.current.map(({description},i)=><li key={i} onClick={()=>{handleClick(i)}} className='cursor-pointer'>
            {description}
            </li>
            )}
        </ul>)}
      </li>

      <li className='border'>
      <input name="salesPrice"  value={sa[index].salesPrice} onChange={handleChange} type="text" className="w-full focus:outline-none text-center text-xl"/>
      </li>
      <li className='border'>
      <input name="quantity"  value={sa[index].quantity} onChange={handleChange} type="text" className="w-full focus:outline-none text-center text-xl"/>
      </li>
      <li className='border'>
      <input name="amount"  value={sa[index].amount}  onChange={handleChange} type="text" className="w-full focus:outline-none text-center text-xl"/>
      </li>
      </ul>
      
    
  )
}
// export default dynamic(()=>Promise.resolve(forwardRef(SalesPage)),{ssr:false})
export default SalesPage