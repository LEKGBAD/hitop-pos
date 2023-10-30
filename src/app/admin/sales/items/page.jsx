"use client"
import React, { useState,useRef, useEffect } from 'react'
// import {sales} from "./sales"
import SalesTable from "./salesTable"
import dynamic from 'next/dynamic'
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRangePicker } from 'react-date-range';
import axios from 'axios';
import { GET_CATEGORY_ROUTE, GET_ITEMS_ROUTE, GET_SALES_ROUTE, ITEMS_FILTER_ROUTE, SALES_FILTER_ROUTE } from '@/utils/constants';
import DatePicker from "react-datepicker";
import { MdDateRange } from 'react-icons/md';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
} from "recharts";

// let sales=[
//   {sale:[{description:"Milo",salesPrice:"400",quantity:"1",amount:"400",unitPrice:"200",costPrice:"200"}],
//     total:400,
//     costP:200,
//     discount:0,
//     saleId:'Ht878',
//     data:{name:"Gbemi",number:"07032",discount:0},
//     paid:400,
//     owing:0,
//     date:new Date(),
    
//   },
    
//     {sale:[{description:"Shirt",salesPrice:"800",quantity:"1",amount:"800",unitPrice:"400",costPrice:"400"}],
//     total:800,
//     costP:400,
//     discount:0,
//     saleId:'Ht879',
//     data:{name:"Tope",number:"0806",discount:0},
//     paid:800,
//     owing:0,
//     date:"5/22/2023,12:30:00 PM"
//   },

//   {
//     sale:[{description:"Milo",salesPrice:"400",quantity:"1",amount:"400",unitPrice:"200",costPrice:"200"}],
//   total:400,
//   costP:200,
//   discount:0,
//   saleId:'Ht8711',
//   data:{name:"Gbemi",number:"07032",discount:0},
//   paid:400,
//   owing:0,
//   date:new Date()
//   }

// ]


const page = () => {
  const [items,setItems]=useState([])

  const [sales,setSales]=useState([])

  const [sal,setSal]=useState([...sales])
  const [toggleSales,setToggleSales]=useState(true);
  const [toggleCharts,setToggleCharts]=useState(false);
  const [quantity,setQuantity]=useState("");
  const [barpie,setBarPie]=useState("bar");

  
  const [search,setSearch]=useState("")

  const [categ,setCateg]=useState([]);
 
 const [sa,setSa]=useState(items.length ? [...items]: []);
 const init={owing:false,name:"",product:"",start:"",end:"",date:{start:"",end:""},category:"",phoneNumber:"",saleId:"",mode:""}
const iteminit={start:"",end:"",product:"",category:""}
 const [searchData,setSearchData]=useState({owing:false,name:"",product:"",start:"",end:"",date:{start:"",end:""},category:"",phoneNumber:"",saleId:"",mode:""})
 const [itemSearchData,setItemSearchData]=useState({start:"",end:"",product:"",category:""})
  const selectionRange = useRef({
    startDate:new Date(),
    endDate: new Date(),
    key: 'selection',
  })
  const products={};
  const cat={}
  if(toggleCharts){
    sal?.forEach(({items})=>{
      items.forEach(({description,quantity,category})=>{
        if(products[description]){
          products[description]=products[description]+quantity
        }
        else{
          products[description]=quantity
        }
        if(cat[category]){
          cat[category]=cat[category]+quantity
        }
        else{
          cat[category]=quantity
        }
      })
    })
  }
  const ProductChatData=Object.keys(products).map(key=>({name:key,quantity:products[key]}));
  const categoryChatData=Object.keys(cat).map(key=>({category:key,quantity:cat[key]}));
  
  
  
  useEffect(()=>{
    const getItems=async ()=>{
      try{
        const {data:{item}}=await axios.get(GET_ITEMS_ROUTE,{withCredentials:true})
        if(item){
          setItems([...item])
          setSa(item);
        }
      }catch(err){
        console.log(err)
      }
    }
    getItems();

  },[])

  useEffect(()=>{
    const getSales=async ()=>{
      try{
        const {data:{sale}}=await axios.get(GET_SALES_ROUTE,{withCredentials:true})
        if(sale){
          console.log(sale)
          setSales([...sale])
          setSal(sale);
        }
      }catch(err){
        console.log(err)
      }
    }
    getSales();

  },[])
  useEffect(()=>{
    const search=async()=>{
      try{
        const {data:{filtSale}}=await axios.post(SALES_FILTER_ROUTE,{...searchData},{withCredentials:true})
      
          setSal(filtSale)
        
      }catch(err){
        console.log(err)
      }
  
    }
    const timer=setTimeout(()=>{
      search()
    },1000)

    return ()=>{
      clearTimeout(timer)
    }
    

  },[searchData])

  useEffect(()=>{
    const search=async()=>{
      try{
        const {data:{filtItem,quantity}}=await axios.post(ITEMS_FILTER_ROUTE,{...itemSearchData},{withCredentials:true})
        setQuantity(quantity) 
        setSa(filtItem)
        
      }catch(err){
        console.log(err)
      }
  
    }
    const timer=setTimeout(()=>{
      search()
    },1000)

    return ()=>{
      clearTimeout(timer)
    }
    

  },[itemSearchData])

  useEffect(()=>{
    const getCategory =async ()=>{
        try{
         const {data:{cat}}=await axios.get(GET_CATEGORY_ROUTE,{withCredentials:true})
         if(cat){
            setCateg(cat);
         }
        }catch(err){
            console.log(err)
        }
    }
    getCategory()
    },[])
  function handleChange(e){
    setSearch(e.target.value);
    if(!search){
      setSa([...sales])
    }
    else{
    let s=[...sales];
    let b=s.filter(({data})=>data.name.toLowerCase().includes(e.target.value || data.number.includes(e.target.value)))
    setSa([...b])
    }
    
  }
  

  function deleteSale(id){
      let s=[...sa];
    let b=s.filter(({saleId})=>saleId !==id);
    setSa([...b]);
    if(b.length<=0){
      setSa([]);
    }
  }

  function handleSelect(ranges){
    selectionRange.current.startDate=ranges.selection.startDate;
    selectionRange.current.endDate=ranges.selection.endDate;
    let s=[...sales];
    let start=Date.parse(selectionRange.current.startDate)
    let end=Date.parse(selectionRange.current.endDate) 
    let b=s.filter(({createdAt})=>(Date.parse(createdAt)>=start) && (Date.parse(createdAt)<=end))
    setSa([...b]);
    // +86340000+59;
  }

  function searchOnChange(e){
    const {name,value}=e.target;
    let g={...searchData}
    // if(name === "start" || name === "end"){
    //   setSearchData({...searchData,date:{...searchData.date,[name]:value}})
    //   g={...searchData,date:{...searchData.date,[name]:value}}
    // }
    if(name==="owing"){
      g={...searchData,[name]:e.target.checked}
    }
    else{
      g={...searchData,[name]:value}
    }
     
      setSearchData({...searchData,[name]:name==="owing"?e.target.checked:value})
      
    
    // searchFilter(g)

  }
  function itemSearchOnChange(e){
    const {name,value}=e.target;
    setItemSearchData({...itemSearchData,[name]:value});

  }

  async function searchFilter(queryData){
    try{
      const {data:{filtSale}}=await axios.post(SALES_FILTER_ROUTE,{...searchData},{withCredentials:true})
      console.log(filtSale)
    }catch(err){
      console.log(err)
    }

  }
 
  let totalSale=sa.length<=0?0:sa.map(({amount})=>amount).reduce((val,acc)=>val+acc);
  let costSale=sa.length<=0?0:sa.map(({costPrice})=>costPrice).reduce((val,acc)=>val+acc);
  let profit=sa.length<=0?0:totalSale-costSale;


  return (
    <div>
      <div className='flex mb-4'>
      <h3 
      className='p-1 w-[70px] text-center bg-blue-900 text-white cursor-pointer'
      onClick={()=>{
        setToggleSales(true);
        setToggleCharts(false);
      }}
      >
        Sales
      </h3>
      <h3 
      className='ml-2 p-1 w-[70px] text-center bg-blue-900 text-white cursor-pointer'
      onClick={()=>{
        setToggleSales(false);
        setToggleCharts(true);
      }}
      >
        Charts
        </h3>
      </div>
      {toggleSales && <div>
      <div className='flex justify-end items-center mb-4 font-bold text-xl'>
      <h3 className='ml-2 p-3 w-[300px] text-center bg-blue-900 text-white'>Quantity: {quantity}</h3>
      <h3 className='ml-2 p-3 w-[300px] text-center bg-blue-900 text-white'>Total sale: {totalSale}</h3>
      <h3 className='ml-2 p-3 w-[300px] text-center bg-blue-900 text-white'>Total Cost: {costSale}</h3>
      <h3 className='ml-2 p-3 w-[300px] text-center bg-blue-900 text-white'>Profit: {profit}</h3>
      </div>

    <div className='grid grid-cols-[20%_min-content_min-content_1fr] '>
      <div className='flex flex-col space-y-3 '>
        <h3>
          Filter 
          <span className='ml-2 italic text-blue-900 cursor-pointer'
          onClick={()=>{setItemSearchData(iteminit)}}
          >
            (Reset)
          </span>
          </h3>
        <fieldset className='border'>
          <legend className='px-2'>Date</legend>
          <div className='px-3 py-1 flex flex-col space-y-1'>
            <div className='w-full h-[30px] relative'>
              <div className='w-full absolute flex justify-between p-1'>
                {itemSearchData.start ?itemSearchData.start:"Start Date"}
                <MdDateRange className='cursor-pointer '/>
              </div>
            <input type="date"
            name="start"
            className='opacity-0 w-full h-full absolute'
            value={itemSearchData.start}
            onChange={itemSearchOnChange}
            onKeyUp={itemSearchOnChange}
            /> 
            </div>
            
            <div className='w-full h-[30px]  relative'>
              <div className='w-full absolute flex justify-between p-1'>
              {itemSearchData.end ?itemSearchData.end:"End Date"}
                <MdDateRange className='cursor-pointer '/>
              </div>
            <input type="date" 
            name="end"
            className='opacity-0 w-full h-full absolute'
            value={itemSearchData.end}
            onChange={itemSearchOnChange}
            onKeyUp={itemSearchOnChange}
            /> 
            </div>
          </div>
        </fieldset>
        <fieldset className='border'>
          <legend className='px-2'>Product</legend>
          <div className='px-3 py-1'>
          <input type="text" id="first_name" 
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-50 focus:border-blue-50 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          name="product"
          placeholder="Enter Product"
          value={itemSearchData.product}
          onChange={itemSearchOnChange}
          onKeyUp={itemSearchOnChange}
          />
          </div>
        </fieldset>
        <fieldset className='border'>
          <legend className='px-2'>Category</legend>
          <div className='px-3 py-1'>
          <select type="text" id="first_name" 
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-50 focus:border-blue-50 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          name="category"
          placeholder="Enter Category"
          value={itemSearchData.category}
          onChange={itemSearchOnChange}
          onKeyUp={itemSearchOnChange}
          >
          <option value=""></option>
          {categ.length && categ.map(({category})=>
          <option key={category} value={category}>{category}</option>
          )}
          </select>
          </div>
        </fieldset>
      </div>
      <div className='flex flex-col  w-1/4 relative'>
      <input id="check" type="checkbox" name="" className='peer hidden'/>
      <label htmlFor='check' className=' text-blue-900   w-max px-2 cursor-pointer'>Search</label>
      
      <div className="peer-checked:flex peer-checked:flex-col peer-checked:gap-3 bg-slate-100 hidden absolute top-10  spacey-3">
    <input type="text" placeholder='Search' value={search} onKeyUp={handleChange} onChange={handleChange} className='p-1 w-[40%]'/>

    <DateRangePicker
        ranges={[selectionRange.current]}
        onChange={handleSelect}
      />
      </div>
      </div>
      <div><button onClick={()=>{setSa([...items])}} className=' text-blue-900   w-max px-2 cursor-pointer'>All</button></div>
      <div>
    <div className='grid grid-cols-6   bg-blue-900 text-white mb-3 '>
    <h5 className=''>S/N</h5>
    <h5 className=''> Description</h5>
    <h5 className=''> Quantity</h5>
    <h5 className=''>Sales Price</h5>
    <h5 className=''>Amount</h5>
    <h5 className=''>Date</h5>
    {/* <h5 className=''></h5> */}
    </div>
     <div className='flex flex-col gap-y-2 '>
     {sa.map(({description,quantity,salesPrice,amount,createdAt},i)=>(
      <div key={i} className='even:bg-blue-200'>
     <SalesTable  description={description} quantity={quantity} salesPrice={salesPrice} amount={amount} deleteSale={deleteSale}  sale={items} sa={items} index={i} date={createdAt.toLocaleString().split("T")[0]} />
     </div>
     ))}

     </div>
     </div>
    </div>
    </div>}
    {toggleCharts && 
    
    <div className='grid grid-cols-[20%_1fr] gap-4'>
      <div className='flex flex-col space-y-3 '>
      <h3>
          Filter 
          <span className='ml-2 italic text-blue-900 cursor-pointer'
          onClick={()=>{setSearchData(init)}}
          >
            (Reset)
          </span>
          </h3>
        <fieldset className='border'>
          <legend className='px-2'>Date</legend>
          <div className='px-3 py-1 flex flex-col space-y-1'>
            <div className='w-full h-[30px] relative'>
              <div className='w-full absolute flex justify-between p-1'>
                {searchData.start ?searchData.start:"Start Date"}
                <MdDateRange className='cursor-pointer '/>
              </div>
            <input type="date"
            name="start"
            className='opacity-0 w-full h-full absolute'
            value={searchData.start}
            onChange={searchOnChange}
            onKeyUp={searchOnChange}
            /> 
            </div>
            
            <div className='w-full h-[30px]  relative'>
              <div className='w-full absolute flex justify-between p-1'>
              {searchData.end ?searchData.end:"End Date"}
                <MdDateRange className='cursor-pointer '/>
              </div>
            <input type="date" 
            name="end"
            className='opacity-0 w-full h-full absolute'
            value={itemSearchData.end}
            onChange={searchOnChange}
            onKeyUp={searchOnChange}
            /> 
            </div>
          </div>
        </fieldset>
        {/* <fieldset className='border'>
          <legend className='px-2'>Bar/Pie Chart</legend>
          <div className='px-3 py-1'>
          <select 
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-50 focus:border-blue-50 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          name="barpie"
          placeholder="Enter Product"
          value={barpie}
          onChange={(e)=>{setBarPie(e.target.value)}}
          onKeyUp={searchOnChange}
          >
            <option value="bar">Bar Chart</option>
            <option value="pie">Pie Chart</option>
          </select>
          </div>
        </fieldset> */}

      </div>
      <div >
        {barpie === "bar" && <div className=''>
        <BarChart
      width={1000}
      height={400}
      data={ProductChatData}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="quantity" fill="#8884d8" />
    </BarChart>

    <BarChart
      width={1000}
      height={400}
      data={categoryChatData}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="category" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="quantity" fill="#8884d8" />
    </BarChart>
        </div>}
        {barpie === "pie" && <div className='flex'>
        <PieChart width={500} height={300}>
      <Pie
        dataKey="quantity"
        isAnimationActive={false}
        data={ProductChatData}
        cx={200}
        cy={200}
        outerRadius={80}
        fill="#8884d8"
        label
        className=''
      />
      <Tooltip />
    </PieChart>
    {console.log(categoryChatData)}
    <PieChart width={500} height={300}>
      <Pie
        dataKey="quantity"
        isAnimationActive={false}
        data={categoryChatData}
        cx={200}
        cy={200}
        outerRadius={80}
        fill="#8884d8"
        label
        className=''
      />
      <Tooltip />
    </PieChart>
        </div>}
      </div>
    </div>}
      
    </div>
  )
}
export default dynamic(()=>Promise.resolve(page),{ssr:false}) 

// export default page

