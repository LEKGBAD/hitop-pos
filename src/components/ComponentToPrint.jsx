
import React, { useEffect } from 'react'

export const ComponentToPrint = React.forwardRef(({data}, ref) => {
    
    return (
      <div ref={ref} className='print:block p-5 hidden'>
        <h1 className='text-3xl font-bold text-slate-700 text-center mb-1'>HITOP</h1>
    <h3>Name:{data?.name}</h3> 
    <h3>Phone Number:{data?.phoneNumer}</h3>  
    <h3>Date:{data?.createdAt?.split("G")[0]}</h3>
    <h3>Sale ID:{data?.saleId}</h3>
    <h3>Paid:{data?.paid}</h3>
    <h3>Discount:{data?.discount}</h3>
    <h3>Change:{data?.change}</h3>
    <h3>Owing:{data?.owing}</h3>
    
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-5">
    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        
        <thead className="text-xs  text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr className=''>
            
                <th scope="col" className="px-6 py-3">
                    S/N
                </th>
                <th scope="col" className="px-6 py-3 ">
                    <div className="text-center flex items-center">
                        ITEM
                        <a href="#"></a>
                    </div>
                </th>
                <th scope="col" className="px-6 py-3">
                    <div className="flex items-center">
                        QUANTITY
                        <a href="#"></a>
                    </div>
                </th>
                <th scope="col" className="px-6 py-3">
                    <div className="flex items-center">
                        PRICE
                        <a href="#"></a>
                    </div>
                </th>
                <th scope="col" className="px-6 py-3">
                    <div className="flex items-center">
                        AMOUNT
                        <a href="#"></a>
                    </div>
                </th>
            </tr>
        </thead>
        <tbody>
            {data?.sale?.map(({description,quantity,salesPrice,amount},i)=>
            <tr key={i} >
                <td scope="row" className="px-6 py-3  whitespace-nowrap dark:text-white">
        {i+1}
    </td>
    <td scope="row" className="px-6 py-3 whitespace-nowrap dark:text-white">
        {description}
    </td>
    <td className=" px-6 py-3">
    {quantity}
    </td>
    <td className="px-6 py-3">
    {salesPrice}
    </td>
    <td className="px-6 py-3">
    {amount}
    </td>
    
            </tr>
            )}
    <tr>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td className='px-6 py-3'>{data?.total}</td>
    </tr>
        </tbody>
        </table>
        </div>
        </div>
      
    );
  });
