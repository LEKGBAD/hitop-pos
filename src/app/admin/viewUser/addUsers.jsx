import React from 'react'

const addGood = ({val,index,users,onChange,categ}) => {
    const hand=(e)=>{
        console.log("ee")
    }
  return (
    <tr className="bg-white border dark:bg-gray-800 dark:border-gray-700 ">
    <th scope="row" className=" font-medium text-gray-900 whitespace-nowrap dark:text-white">
        <input 
        name="select" 
        value={users[index].loginId}
        type="checkbox" className='w-[100%] p-2 focus:outline-none bg-none'
        onChange={(e)=>{
            onChange(e,index)
        }}
        />
    </th>
    <th scope="row" className=" font-medium text-gray-900 whitespace-nowrap dark:text-white">
        <input 
        name="loginId" 
        value={users[index].loginId}
        type="text" className='w-[100%] p-2 focus:outline-none'
        onChange={(e)=>{
            onChange(e,index)
        }}
        onDoubleClick={()=>{console.log("hhhh")}}
        />
    </th>
    <td className="border">
    <input 
    name="firstName" type="text"
    value={users[index].firstName}
    className='w-[100%] p-2 focus:outline-none'
    onChange={(e)=>{
        onChange(e,index)
    }}
    />
    </td>
    <td className="border">
    <input 
    name="lastName" type="text" 
    value={users[index].lastName}
    className='w-[100%] p-2 focus:outline-none' 
    onChange={(e)=>{
        onChange(e,index)
    }}
    />
    </td>
    <td className="border">
    <input 
    name="wholesalePrice" type="text" 
    readOnly
    value={users[index].createdAt}
    className='w-[100%] p-2 focus:outline-none' 
    onChange={(e)=>{
        onChange(e,index)
    }}
    />
    </td>
    
</tr>
  )
}

export default addGood
