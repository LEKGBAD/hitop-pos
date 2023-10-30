import React from 'react'
import { useRouter } from 'next/navigation'


const SalesTable = ({description,salesPrice,quantity,amount,date,index,deleteSale}) => {
const router=useRouter();
  return (
    
    <div  className='grid grid-cols-6 items-center selection:cursor-auto   text-sm cursor-pointer'>
      {/* <input type="checkbox" name="state" id="" value={status} className='mx-2' /> */}
      <h5 className=''>{index+1}</h5>
      <h5 className=''>{description}</h5>
      <h5 className=''>{quantity}</h5>
      <h5 className=''>{salesPrice}</h5>
      <h5 className=''>{amount}</h5>
      <h5 className=''>{date}</h5>
      {/* <button onClick={(e)=>{
        e.stopPropagation();
        deleteSale(saleId);
      }} className='border border-blue-700 bg-white text-blue-700  w-max p-1 justify-self-end'>
        Delete
     </button> */}
    </div>
    
    
  )
}

export default SalesTable
