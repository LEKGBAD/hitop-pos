import React from 'react'

const addGood = ({val,index,goods,onChange,categ}) => {
  return (
    <tr className="bg-white border dark:bg-gray-800 dark:border-gray-700">
    <th scope="row" className=" font-medium text-gray-900 whitespace-nowrap dark:text-white">
        <input 
        name="description" 
        value={goods[index].description}
        type="text" className='w-[100%] p-2 focus:outline-none'
        onChange={(e)=>{
            onChange(e,index)
        }}
        />
    </th>
    <td className="border">
    <input 
    name="unitPrice" type="text"
    value={goods[index].unitPrice}
    className='w-[100%] p-2 focus:outline-none'
    onChange={(e)=>{
        onChange(e,index)
    }}
    />
    </td>
    <td className="border">
    <input 
    name="retailPrice" type="text" 
    value={goods[index].retailPrice}
    className='w-[100%] p-2 focus:outline-none' 
    onChange={(e)=>{
        onChange(e,index)
    }}
    />
    </td>
    <td className="border">
    <input 
    name="wholesalePrice" type="text" 
    value={goods[index].wholesalePrice}
    className='w-[100%] p-2 focus:outline-none' 
    onChange={(e)=>{
        onChange(e,index)
    }}
    />
    </td>
    <td className="border">
    {goods[index].description && <select
    name="category" type="text" 
    value={goods[index].category}
    className='w-[100%] p-2 focus:outline-none'
    onChange={(e)=>{
        onChange(e,index)
    }}
    >
        <option value=""></option>
        {categ.map(val=>
           <option key={val.category} value={val.category}>{val.category}</option> 
            )}
    </select>}
    </td>
</tr>
  )
}

export default addGood
