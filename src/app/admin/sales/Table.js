"use client"
import React,{useState} from 'react'
import { useContext } from 'react'
import { salesContext as sa} from '../layout';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';


import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { salesContext } from '../layout'
import {sales} from "./sales"

// type Person = {
//   firstName: string
//   lastName: string
//   age: number
//   visits: number
//   status: string
//   progress: number
// }



function App() {
  // const {sales,setSales}=useContext(sa);
  let router=useRouter();
  
  const columnHelper = createColumnHelper();
  
  const columns = [
    
    columnHelper.accessor('saleId', {
      // id: 'saleId',
      cell: info => <i>{info.getValue()}</i>,
      header: () => <span>Sale ID</span>,
      footer: info => info.column.id,
    }),

    columnHelper.accessor(row=>row.data.name, {
      id: 'Name',
      cell: info => <i>{info.getValue()}</i>,
      header: () => <span className=''>Customer Name</span>,
      footer: info => info.column.id,
    }),

    columnHelper.accessor('total', {
      // id: 'lastName',
      cell: info => <i>{info.getValue()}</i>,
      header: () => <span>Amount</span>,
      footer: info => info.column.id,
    }),

    columnHelper.accessor('owing', {
      // id: 'lastName',
      cell: info => <i>{info.getValue()}</i>,
      header: () => <span>Owing</span>,
      footer: info => info.column.id,
    }),
    
  ]

  const [data, setData] = React.useState(() => [...sales])
  const rerender = React.useReducer(() => ({}), {})[1]

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })
  let b=table.getCoreRowModel().rows;
  let c=b.map(({original})=>original);
  // console.log(c)
  

  return (
    <div>
    <div className="p-2 flex justify-center items-center">
      <table className='text-center'>
        <thead >
          {table.getHeaderGroups().map(headerGroup => (
            <tr className='' key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th  className='p-10' key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map(row => {
            return (
            <tr key={row.id} onClick={()=>{router.push(`/hitop?id=${row.original}`)}}>
              {row.getVisibleCells().map(cell => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          )} ) }
        </tbody>
        <tfoot>
          {table.getFooterGroups().map(footerGroup => (
            <tr key={footerGroup.id}>
              {footerGroup.headers.map(header => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.footer,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </tfoot>
      </table>
      <div className="h-4" />
      
    </div>
    <button onClick={() => rerender()} className="border p-2">
        Rerender
      </button>
    </div>
  )
}
export default dynamic(()=>Promise.resolve(App),{ssr:false}) 

// export default App