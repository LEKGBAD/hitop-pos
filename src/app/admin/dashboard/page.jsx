"use client"
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useStateProvider } from '@/context/stateContext'
import AuthWrapper from '@/components/AuthWrapper'
import { useCookies } from 'react-cookie'

const Page = () => {
    const Router=useRouter();
    const [{userInfo,isAdmin}]=useStateProvider();
    const [cookie]=useCookies()
    

    
  return (
    
        <div className="grid grid-cols-3 gap-16 w-full">
            <div 
            className=" shadow-md h-max p-[45px] flex flex-col gap-2 cursor-pointer hover:shadow-xl transition-all duration-300 text-center"
            onClick={()=>{Router.push("/admin/addUser")}}
            >
              <h2 className="text-xl"> Add User </h2>
              <h3 className='text-[#1DBF73] font-3xl font-extrabold'>{}</h3>
            </div>

            <div 
            className=" shadow-md h-max p-[45px] flex flex-col gap-2 cursor-pointer hover:shadow-xl transition-all duration-300 text-center"
            onClick={()=>{Router.push("/admin/viewUser")}}
            >
              <h2 className="text-xl">Edit/Delete User</h2>
              <h3 className='text-[#1DBF73] font-3xl font-extrabold'></h3>
            </div>

            <div 
            className=" shadow-md h-max p-[45px] flex flex-col gap-2 cursor-pointer hover:shadow-xl transition-all duration-300 text-center"
            onClick={()=>{Router.push("/admin/sales")}}
            >
              <h2 className="text-xl">Sales</h2>
              <h3 className='text-[#1DBF73] font-3xl font-extrabold'></h3>
            </div>

            <div 
            className=" shadow-md h-max p-[45px] flex flex-col gap-2 cursor-pointer hover:shadow-xl transition-all duration-300 text-center"
            onClick={()=>{Router.push("/admin/sales/items")}}
            >
              <h2 className="text-xl">Items/Charts</h2>
              <h3 className='text-[#1DBF73] font-3xl font-extrabold'></h3>
            </div>

            <div 
            className=" shadow-md h-max p-[45px] flex flex-col gap-2 cursor-pointer hover:shadow-xl transition-all duration-300 text-center"
            onClick={()=>{Router.push("/admin/goods/add")}}
            >
              <h2 className="text-xl">Add Goods</h2>
              <h3 className='text-[#1DBF73] font-3xl font-extrabold'></h3>
            </div>

            <div 
            className=" shadow-md h-max p-[45px] flex flex-col gap-2 cursor-pointer hover:shadow-xl transition-all duration-300 text-center"
            onClick={()=>{Router.push("/admin/goods/view")}}
            >
              <h2 className="text-xl">View/Edit Goods</h2>
              <h3 className='text-[#1DBF73] font-3xl font-extrabold'></h3>
            </div>
            
          </div>
        
          
          
          
    
  )
}

export default Page
