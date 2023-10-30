"use client"
import React, { HTMLAttributes, HTMLProps, useState } from 'react'
import ReactDOM from 'react-dom/client'
import {sales} from "./sales"
import dynamic from 'next/dynamic'

// import './index.css'

// import { makeData, Person } from './makeData'

import {
  Column,
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  Table,
  useReactTable,
} from '@tanstack/react-table'

function App() {
  const rerender = React.useReducer(() => ({}), {})[1]

  const [rowSelection, setRowSelection] = React.useState({})
  const [globalFilter, setGlobalFilter] = React.useState('')

  const columns = React.useMemo(
    () => [
      {
        id: 'select',
        header: ({ table }) => (
          <IndeterminateCheckbox
            {...{
              checked: table.getIsAllRowsSelected(),
              indeterminate: table.getIsSomeRowsSelected(),
              onChange: table.getToggleAllRowsSelectedHandler(),
            }}
          />
        ),
        cell: ({ row }) => (
          <div className="px-1">
            <IndeterminateCheckbox
              {...{
                checked: row.getIsSelected(),
                disabled: !row.getCanSelect(),
                indeterminate: row.getIsSomeSelected(),
                onChange: row.getToggleSelectedHandler(),
              }}
            />
          </div>
        ),
      },
      // {
        // header: 'Sale ID',
        // footer: props => props.column.id,
        // columns: [
          {
            accessorFn:row=>row.data.number ,
            header: 'Phone Number',
            footer: props => props.column.id,
            cell: info => info.getValue(),
            // footer: props => props.column.id,
          },

          {
            accessorFn:row=>row.data.name,
            header: 'Customer Name',
            footer: props => props.column.id,
            cell: info => info.getValue(),
            // footer: props => props.column.id,
          },

          {
            accessorKey:"total",
            header: 'Amount',
            footer: props => props.column.id,
            cell: info => info.getValue(),
            // footer: props => props.column.id,
          },

          {
            accessorKey:"paid",
            header: 'Paid',
            footer: props => props.column.id,
            cell: info => info.getValue(),
            // footer: props => props.column.id,
          },

          {
            accessorKey:"owing",
            header: 'Owing',
            footer: props => props.column.id,
            cell: info => info.getValue(),
            // footer: props => props.column.id,
          },

          {
            accessorFn:row=>new Date().toString(),
            header: 'Date',
            footer: props => props.column.id,
            cell: info => info.getValue(),
            // footer: props => props.column.id,
          },
          
    ],
    []
  )
  // let b=sales.filter(({data})=>data.name.toLocaleLowerCase().includes(globalFilter) || data.number.includes(globalFilter))
  
  
  const [sa,setSa]=useState(...[sales]);
  const [data, setData] = React.useState(sa)
  const refreshData = () => setData(sales)

  
  const table = useReactTable({
    data,
    columns,
    state: {
      rowSelection,
      globalFilter
    },
    enableRowSelection: true, //enable row selection for all rows
    // enableRowSelection: row => row.original.age > 18, // or enable row selection conditionally per row
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    // debugTable: true,
  })

  return (
    <div className="p-2">
      <div>
        <input
          value={globalFilter ?? ''}
          onChange={e => {
            setGlobalFilter(e.target.value);
        }}

            
          className="p-2 font-lg shadow border border-block"
          placeholder="Search all columns..."
        />
      </div>
      <div className="h-2" />
      <table className=''>
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => {
                return (
                  <th key={header.id} colSpan={header.colSpan}>
                    {header.isPlaceholder ? null : (
                      <>
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {header.column.getCanFilter() ? (
                          <div>
                            <Filter column={header.column} table={table} />
                          </div>
                        ) : null}
                      </>
                    )}
                  </th>
                )
              })}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map(row => {
            return (
              <tr key={row.id}>
                {row.getVisibleCells().map(cell => {
                  return (
                    <td key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
        <tfoot>
          <tr>
            <td className="p-1">
              <IndeterminateCheckbox
                {...{
                  checked: table.getIsAllPageRowsSelected(),
                  indeterminate: table.getIsSomePageRowsSelected(),
                  onChange: table.getToggleAllPageRowsSelectedHandler(),
                }}
              />
            </td>
            <td colSpan={20}>Page Rows ({table.getRowModel().rows.length})</td>
          </tr>
        </tfoot>
      </table>
      <div className="h-2" />
      <div className="flex items-center gap-2 justify-center">
        <button
          className="border rounded p-1"
          onClick={() => table.setPageIndex(0)}
          disabled={!table.getCanPreviousPage()}
        >
          {'<<'}
        </button>
        <button
          className="border rounded p-1"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          {'<'}
        </button>
        <button
          className="border rounded p-1"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          {'>'}
        </button>
        <button
          className="border rounded p-1"
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          disabled={!table.getCanNextPage()}
        >
          {'>>'}
        </button>
        <span className="flex items-center gap-1">
          <div>Page</div>
          <strong>
            {table.getState().pagination.pageIndex + 1} of{' '}
            {table.getPageCount()}
          </strong>
        </span>
        <span className="flex items-center gap-1">
          | Go to page:
          <input
            type="number"
            defaultValue={table.getState().pagination.pageIndex + 1}
            onChange={e => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0
              table.setPageIndex(page)
            }}
            className="border p-1 rounded w-16"
          />
        </span>
        <select
          value={table.getState().pagination.pageSize}
          onChange={e => {
            table.setPageSize(Number(e.target.value))
          }}
        >
          {[10, 20, 30, 40, 50].map(pageSize => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
      <button onClick={()=>{
        let r=table.getSelectedRowModel().rows.map(({id})=>Number(id));
        let s=[...sa];
        let ds=s.filter((val,i)=>!r.includes(i))
        setSa([...ds]);
      }}>Delete Sale</button>
      <br />
      <div>
        {Object.keys(rowSelection).length} of{' '}
        {table.getPreFilteredRowModel().rows.length} Total Rows Selected
      </div>
      <hr />
      <br />
      <div>
        <button className="border rounded p-2 mb-2" onClick={() => rerender()}>
          Force Rerender
        </button>
      </div>
      <div>
        <button
          className="border rounded p-2 mb-2"
          onClick={() => refreshData()}
        >
          Refresh Data
        </button>
      </div>
      <div>
        <button
          className="border rounded p-2 mb-2"
          onClick={() => console.info('rowSelection', rowSelection)}
        >
          Log `rowSelection` state
        </button>
      </div>
      <div>
        <button
          className="border rounded p-2 mb-2"
          onClick={() =>
            console.info(
              'table.getSelectedFlatRows()',
              table.getSelectedRowModel().flatRows
            )
          }
        >
          Log table.getSelectedFlatRows()
        </button>
      </div>
    </div>
  )
}

function Filter({
  column,
  table,
}) {
  const firstValue = table
    .getPreFilteredRowModel()
    .flatRows[0]?.getValue(column.id)

  return typeof firstValue === 'number' ? (
    <div className="flex space-x-2">
      <input
        type="number"
        value={column.getFilterValue()}
        onChange={e =>
          column.setFilterValue((old) => [e.target.value, old?.[1]])
        }
        placeholder={`Min`}
        className="w-24 border shadow rounded"
      />
      <input
        type="number"
        value={column.getFilterValue()}
        onChange={e =>
          column.setFilterValue((old) => [old?.[0], e.target.value])
        }
        placeholder={`Max`}
        className="w-24 border shadow rounded"
      />
    </div>
  ) : (
    <input
      type="text"
      value={(column.getFilterValue() ?? '')}
      onChange={e => column.setFilterValue(e.target.value)}
      placeholder={`Search...`}
      className="w-36 border shadow rounded"
    />
  )
}

function IndeterminateCheckbox({
  indeterminate,
  className = '',
  ...rest
}) {
  const ref = React.useRef(null)

  React.useEffect(() => {
    if (typeof indeterminate === 'boolean') {
      ref.current.indeterminate = !rest.checked && indeterminate
    }
  }, [ref, indeterminate])

  return (
    <input
      type="checkbox"
      ref={ref}
      className={className + ' cursor-pointer'}
      {...rest}
    />
  )
}
export default dynamic(()=>Promise.resolve(App),{ssr:false}) 

// export default App
