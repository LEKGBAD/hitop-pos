"use client"
import React, { useEffect, useState } from 'react'
// import {sales} from "../sales/sales"
import { useSearchParams } from 'next/navigation'
import { GET_SALES_ROUTE, MAKE_PAYMENT_ROUTE } from '@/utils/constants'
import axios from 'axios'

const Page = ({searchParams}) => {
  const [sales,setSales]=useState([])
  const [paid,setPaid]=useState("");
  const [payy,setPayy]=useState([])
    let s=sales.filter((sale)=>sale.saleId===searchParams.id)[0]
    console.log(sales)
    useEffect(()=>{
      const getSales=async ()=>{
        try{
          const {data:{sale}}=await axios.get(GET_SALES_ROUTE,{withCredentials:true})
          if(sale){
            setSales([...sale])
            console.log(sale)
          }
        }catch(err){
          console.log(err)
        }
      }
      getSales();
  
    },[])
    const handlePay=async()=>{
      try{
        if(paid)
        {const {data:{success,ppp}}=await axios.post(MAKE_PAYMENT_ROUTE,{paid,saleId:s.saleId,id:s.id},{
          withCredentials:true})

          if(success){
            location.reload()
            setPaid("")
          }}
      }catch(err){
        console.log(err);
      }
    }

  return (
    <div className=' mx-auto'>

        
      <div className={`w-[100%] grid grid-cols-[min-content_1fr] items-start  gap-2`}>
       {<div className='w-[250px] mt-7 p-2  flex flex-col justify-center items-center space-y-2 border'>
        <h3 className='font-bold text-2xl'>Payment</h3>
        <input type="text"
          className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-50 focus:border-blue-50 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          name="name"
          readOnly={true}
          placeholder={s?.saleId}
          />
        <input type="text"
          className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-50 focus:border-blue-50 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          name="paid"
          value={paid}
          readOnly={s?.owing >0 ? false :true}
          onChange={(e)=>{
            setPaid(e.target.value)
          }}
          placeholder="Enter Amount"
          />
        <button 
        className={`${(s?.owing>0 && paid<=s?.owing) ? "bg-green-500":"bg-slate-500"} text-white p-1 w-full`}
        onClick={handlePay}
        disabled={(s?.owing<=0 || paid>s?.owing) ? true :false}
        >
          Pay
          </button>

        <div className='border w-full'>
          <h3 className='text-center font-bold'>Payment History</h3>
          <ul className='w-full'>
            <li className='flex items-center justify-around'>{s?.paid} <span className='text-sm italic pl-3'>{s?.createdAt.split("T")[0]}</span></li>
            {s?.payments && s?.payments?.map(({amount,createdAt})=>
            <li className='flex items-center justify-around' key={createdAt}>{amount} <span className='text-sm italic'>{createdAt.split("T")[0]}</span></li>
            )}
          </ul>
        </div>
          </div>}

      
      <div>
        <h3 className='text-right mb-1'>{s?.createdAt.toLocaleString().split("T")[0]}</h3>

        <div className='grid grid-cols-5 justify-center text-white bg-blue-900 mb-3'>
            <h3 className='col-span-2 '>Description</h3>
            <h3 className='text-center'>Price</h3>
            <h3 className='text-center'>Quantity</h3>
            <h3 className='text-right'>Amount</h3>
        </div>
        {s?.items?.map((val)=>(
            <div className='grid grid-cols-5 justify-center mb-3' key={val.id}>
            <h3 className='col-span-2 '>{val.description}</h3>
            <h3 className='text-center'>{val.salesPrice}</h3>
            <h3 className='text-center'>{val.quantity}</h3>
            <h3 className='text-right'>{val.amount}</h3>
            </div>
        ))}
        <div className='grid grid-cols-5 justify-center mt-3'>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div className='text-right font-bold text-xl'>{s?.total}</div>
        </div>

        <div className='grid grid-cols-4 my-8 justify-center items-center'>
      <div className='relative'>
        <h3 className='w-full focus:outline-none border font-bold text-center text-xl bg-blue-900 text-white'><span>Paid </span>{s?.paid}</h3>
      </div>
      <div className='relative'>
        <h3 className='w-full focus:outline-none border font-bold text-center text-xl bg-blue-900 text-white'><span>Discount </span>{s?.discount}</h3>
      </div>

      <div className='relative'>
        <h3 className='w-full focus:outline-none border font-bold text-center text-xl bg-blue-900 text-white'><span>Change </span>{s?.change}</h3>
      </div>

      <div className='relative'>
        
        <h3 className='w-full focus:outline-none border font-bold text-center text-xl bg-blue-900 text-white'><span>Owing </span>{s?.owing}</h3>
      </div>

      </div>
      </div>
      </div>
      
    </div>
  )
}

export default Page
