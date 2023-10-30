import React from 'react'
import { useRouter } from 'next/navigation'


const SalesTable = ({id,sale,owing,number,name,amount,paid,date,index,deleteSale,saleId}) => {
const router=useRouter();
  return (
    
    <div onClick={()=>{router.push(`/saleinfo?id=${saleId}`)}}  className='grid grid-cols-8 items-center selection:cursor-auto   text-sm cursor-pointer'>
      {/* <input type="checkbox" name="state" id="" value={status} className='mx-2' /> */}
      <h5 className=''>{index+1}</h5>
      <h5 className=''>{number}</h5>
      <h5 className=''>{name}</h5>
      <h5 className=''>{amount}</h5>
      <h5 className=''>{paid}</h5>
      <h5 className=''>{owing}</h5>
      <h5 className=''>{date}</h5>
      <button onClick={(e)=>{
        e.stopPropagation();
        deleteSale(id);
      }} className='border border-blue-700 bg-white text-blue-700  w-max p-1 justify-self-end'>
        Delete
     </button>
    </div>
    
    
  )
}

export default SalesTable
