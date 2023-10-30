"use client"
import React,{useState,useRef, useContext} from 'react'
import SalesPage  from './salesPage'
import dynamic from 'next/dynamic'
import { v4 as uuid } from 'uuid';
import {goods} from "./goods"
// import { salesContext } from '../layout';
import Link from 'next/link';
import AuthWrapper from '@/components/authWrapper';
import { useStateProvider } from '@/context/stateContext';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import { SUBMIT_SALE_ROUTE } from '@/utils/constants';
import { reducerCases } from '@/context/constants'
import { useReactToPrint } from 'react-to-print';
import { ComponentToPrint } from '@/components/ComponentToPrint';




const Page = () => {
  // const {sales,setSales}=useContext(salesContext);
  const [{showAuthModal,userInfo,mode},dispatch]=useStateProvider();
  const [sales,setSales]=useState([]);
  const [cookie]=useCookies();
  let init=[
    {description:"",salesPrice:"",quantity:"",amount:"",unitPrice:"",costPrice:""},
    {description:"",salesPrice:"",quantity:"",amount:"",unitPrice:"",costPrice:""}, 
    {description:"",salesPrice:"",quantity:"",amount:"",unitPrice:"",costPrice:""},
    {description:"",salesPrice:"",quantity:"",amount:"",unitPrice:"",costPrice:""},         
  ]
const [sale,setSale]=useState(init);
const [data,setData]=useState({discount:"",paid:"",name:"",number:""});
const [printData,setPrintData]=useState([]);
const tel=userInfo?.loginId;
const componentRef = useRef();
const [message,setMessage]=useState("")



let s=sale.map(({amount})=>amount).reduce((am,acc)=>Number(am)+acc);
let c=sale.map(({costPrice})=>costPrice).reduce((am,acc)=>Number(am)+acc);
let sum=s==="0" ?"":s;
let payment=data.discount ?sum-data.discount:sum;
let change=((data.paid) && (data.paid>=payment)) ? (data.paid-(payment-data.discount)):"";
let chan=""
let ch=data.paid-payment






function handleChange(e){
  const {name,value}=e.target;
  let d={...data}
  d[name]=value;
  setData({...d})
}

async function handlePay(){
  
  
  const saleId=`HT${uuid().slice(0,8)}`;
  let da=sale.filter(({description})=>description != "");
   let saleData={
    sale:da,
    total:sum,
    costP:c,
    discount:data.discount?data.discount:0,
    name:data.name?data.name:"",
    number:data.number?data.number:"",
    saleId:saleId,
    data:data,
    paid:data.paid,
    change:ch>=0?ch:0,
    owing:ch<0?-ch:0,
    // owing:change<=0?payment-data.paid:0,
    date:new Date().toLocaleString(),
    teller:tel,
    mode:!mode?"Retail":"Wholesale"
  }
setSales([...sales,saleData]);
const response=await axios.post(SUBMIT_SALE_ROUTE,{...saleData},{
  withCredentials:true
})
console.log("yeee")
if(response.data.success){
  handleClear();
  setMessage("")
  setPrintData(response.data.s)
}
else{
  setMessage("Please Fill all fields")
}
  


}
const handlePrint = useReactToPrint({
  content: () => componentRef.current,
});

function handleClear(){
setSale([...init])
setData({discount:"",paid:"",name:"",number:""});
}
function handleAdd(){
  let s=[...sale];
  setSale([...sale,...init]);
}

  return (
    <div className='bg-[#bfdbfe]'>
      <h3 className='text-xl text-red-500 font-bold'>{message}</h3>
      <div className='grid grid-cols-5 justify-between gap-1 bg-blue-900 p-5 items-center space-x-10'>
        <input type="text" name="name" value={data.name} onChange={handleChange} placeholder='Name' className="col-span-3 text-xl rounded-md  p-2 focus:outline-0" />
        <input type="text" name="number" value={data.number} onChange={handleChange} placeholder='Number ' className="p-2 text-xl rounded-md focus:outline-0" />
        <span 
        className='text-white cursor-pointer'
        onClick={()=>{dispatch({type:reducerCases.SWITCH_MODE,mode:!mode})}}
        >
          Swich to {mode?"Retail":"Wholesale"}
          </span>
      </div>
      <div className="grid grid-cols-5 justify-center">
        <h3 className='text-center text-2xl font-bold col-span-2 '>Description</h3>
        <h3 className='text-center text-2xl font-bold '>Price</h3>
        <h3 className='text-center text-2xl font-bold '>Quantity</h3>
        <h3 className='text-center text-2xl font-bold '>Amount</h3>
      </div>
      <div>
      {sale.map((sal,i)=><SalesPage key={i} sa={sale} setSa={setSale}  index={i} sal={sal} />)}
      </div>
      <div className="grid grid-cols-5 justify-center">
        <button onClick={handleAdd} className='border border-blue-900  w-max px-2'>Add</button>
        <h3 className='text-center text-2xl font-bold'></h3>
        <h3 className='text-center text-2xl font-bold'></h3>
        <h3 className='text-center text-2xl font-bold'></h3>
        <h3 className='text-center text-2xl font-bold  '>{sum}</h3>
      </div>
      <div className='grid grid-cols-3 my-8 items-center'>
      <div className='relative'>
        <label htmlFor="" className="absolute block w-[25%] text-center text-blue-900  text-xl p-1">Paid</label>
      <input type="text" name="paid" value={data.paid} onChange={handleChange} placeholder='' disabled={!sum && true} className='w-full focus:outline-none border font-bold text-center text-2xl disabled:bg-white ' />
      </div>
      <div className='relative'>
        <label htmlFor="" className="absolute block w-[25%] text-center  text-blue-900 text-xl p-1">Discount</label>
      <input type="text" name="discount" value={data.discount} onChange={handleChange} placeholder='' className='w-full focus:outline-none border font-bold text-center text-2xl ' />
      </div>

      <div className='relative'>
        <label htmlFor="" className="absolute block w-[25%] text-center text-blue-900 text-xl p-1">Change</label>
      <input type="text" name="change" onChange={handleChange} value={(ch>=0 && data.paid)?ch:""}  placeholder='' className='w-full focus:outline-none border font-bold text-center text-2xl ' />
      </div>

      </div>
      <div className='text-center'>
      <button onClick={handlePay} className='relative bg-blue-900 p-4 w-[20%] rounded-lg text-white font-bold text-2xl m-5 disabled:bg-slate-400 ' disabled={(!data.paid) && true}>
        <span className='relative'>Pay</span> 
        <span onClick={()=>{
          setTimeout(()=>{
            if(message){
            handlePrint()
            }
          },2000)
          
        }} 
        className='absolute left-0 top-0 w-full h-full block opacity-0'
        >Print this Out
        </span>
        </button>
      <button onClick={handleClear} className=' bg-white text-blue-900 border border-blue-900 p-4 w-[20%] rounded-lg  font-bold text-2xl m-5 '>Clear</button>
      </div>
      <ComponentToPrint ref={componentRef}  data={printData} />
      {/* <Link href="/sales">sales</Link> */}
      {!cookie.jwt && <AuthWrapper type="Login" forr="user"/>}
      
    </div>
  )
}

export default dynamic(()=>Promise.resolve(Page),{ssr:false}) 
// export default Page
